import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../prismaDb/prismaDb";

const { JWT_SECRET_KEY } = process.env;
if (!JWT_SECRET_KEY) {
  throw new Error("Missing JWT_SECRET_KEY environment variable");
}

interface CustomRequest extends Request {
  user?: { adminId: string };
}

const checkAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    const email = decoded.email;

    const user = await prisma.admin.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = { adminId: user.id };
    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: "Unauthorized", error: (error as Error)?.message });
    return;
  }
};

export default checkAuth;
