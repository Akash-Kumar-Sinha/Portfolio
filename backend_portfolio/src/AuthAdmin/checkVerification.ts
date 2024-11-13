import { Request, Response } from "express";
import { prisma } from "../prismaDb/prismaDb";

const checkVerification = async (req: Request, res: Response) => {
  console.log("Checking verification");
  const email = req.query.email;
  console.log("Email: ", email);

  if (!email) {
    res.status(400).json({ message: "Email is required", phase: "FAILED" });
    return;
  }

  try {
    const verifiedEmail = await prisma.emailVerification.findUnique({
      where: { email: String(email) },
    });

    if (!verifiedEmail) {
      console.log("verifiedEmail: ", verifiedEmail);
      res.status(404).json({ message: "User not found", phase: "FAILED" });
      return;
    }

    if (!verifiedEmail.verified) {
      res.status(401).json({ message: "User not verified", phase: "FAILED" });
      return;
    }
    res.status(200).json({ message: "User verified", phase: "VERIFIED" });
  } catch (error) {
    console.error("Error during verification check:", error);
    res.status(500).json({ message: "Internal server error", phase: "FAILED" });
  }
};

export default checkVerification;
