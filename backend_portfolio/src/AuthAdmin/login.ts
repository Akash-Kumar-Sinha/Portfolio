import { Request, Response } from "express";
import { prisma } from "../prismaDb/prismaDb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { JWT_SECRET_KEY } = process.env;

if (!JWT_SECRET_KEY) {
  throw new Error("Missing JWT_SECRET_KEY environment variable");
}

const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      res.status(400).json({
        message: "Email, username, and password are required",
        phase: "FAILED",
      });
      return;
    }

    const checkEmailVerification = await prisma.emailVerification.findUnique({
      where: { email },
    });

    if (!checkEmailVerification) {
      res.status(400).json({ message: "Email not verified", phase: "FAILED" });
      return;
    }

    if (checkEmailVerification.verified === false) {
      res.status(400).json({ message: "Email not verified", phase: "FAILED" });
      return;
    }

    const user = await prisma.admin.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "User not found", phase: "FAILED" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password", phase: "FAILED" });
      return;
    }

    if (user.username !== username) {
      res.status(401).json({ message: "Invalid username", phase: "FAILED" });
      return;
    }

    const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "20hr" });

    res
      .status(200)
      .json({ message: "Login successful", token, phase: "SUCCESS" });
  } catch (error) {
    console.error("Error in Login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default Login;
