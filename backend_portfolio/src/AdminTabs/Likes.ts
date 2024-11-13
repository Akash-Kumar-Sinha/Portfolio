import { Request, Response } from "express";
import { prisma } from "../prismaDb/prismaDb";

const getLikes = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: "akashkrsinha4805@gmail.com",
      },
    });

    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    res.status(200).json({ likes: admin.likes });
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateLikes = async (req: Request, res: Response) => {
  try {
    const updatedAdmin = await prisma.admin.update({
      where: {
        email: "akashkrsinha4805@gmail.com",
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    res.status(200).json({ likes: updatedAdmin.likes });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getLikes, updateLikes };
