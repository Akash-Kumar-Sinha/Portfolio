import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { prisma } from "../prismaDb/prismaDb";
import jwt from "jsonwebtoken";

const { EMAIL, EMAIL_PASSWORD, SERVER_URL, JWT_SECRET_KEY } = process.env;

if (!JWT_SECRET_KEY) {
  throw new Error("Missing JWT_SECRET_KEY environment variable");
}

if (!EMAIL || !EMAIL_PASSWORD) {
  throw new Error("Missing EMAIL or EMAIL_PASSWORD environment variables");
}

const sendToken = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const token = jwt.sign({ data: email }, JWT_SECRET_KEY, {
      expiresIn: "20m",
    });

    const emailRecord = await prisma.emailVerification.findUnique({
      where: { email },
    });

    if (!emailRecord) {
      await prisma.emailVerification.create({
        data: { email, verificationToken: token, verified: false },
      });
    } else {
      await prisma.emailVerification.update({
        where: { email },
        data: { verificationToken: token, verified: false },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: EMAIL, pass: EMAIL_PASSWORD },
    });

    const verificationLink = `${SERVER_URL}/auth_check/${email}/${token}`;

    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: "Email Verification",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <p>Welcome!</p>
          <a href="${verificationLink}" style="text-decoration: none; color: #007bff; font-size: 18px;">
            Click here to validate your admin account
          </a>
        </div>`,
    });

    res.status(200).json({ message: "Verification email sent" , phase: "SENT"});
  } catch (error) {
    console.error("Error in sendToken:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default sendToken;
