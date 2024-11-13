import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prismaDb/prismaDb"; // Assuming you have set up prisma correctly
import jwt from "jsonwebtoken";

const { JWT_SECRET_KEY } = process.env;

if (!JWT_SECRET_KEY) {
  throw new Error("Missing JWT_SECRET_KEY environment variable");
}

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      res
        .status(400)
        .json({ message: "Email, username, and password are required" });
      return;
    }

    const existingUser = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ message: "User already exists with this email" });
      return;
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.admin.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "20m" });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default signUp;
