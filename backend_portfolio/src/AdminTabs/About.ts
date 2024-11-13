import { Request, Response } from "express";

import { prisma } from "../prismaDb/prismaDb";

interface CustomRequest extends Request {
  user?: { adminId: string };
}

const getAbout = async (req: CustomRequest, res: Response) => {
  try {
    const aboutDetails = await prisma.about.findMany({
      where: { adminId: req.user?.adminId },
    });

    res.json(aboutDetails);
  } catch (error) {
    console.error("Error fetching about details:", error);
    res.status(500).json({ error: "Failed to retrieve about details" });
  }
};

const editAbout = async (req: CustomRequest, res: Response) => {
  const { title, description, image } = req.body;
  const { adminId } = req.user || {};

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const existingAbout = await prisma.about.findUnique({
      where: { adminId },
    });

    let updatedOrNewAbout;
    if (existingAbout) {
      updatedOrNewAbout = await prisma.about.update({
        where: { adminId },
        data: { title, description, image },
      });
    } else {
      updatedOrNewAbout = await prisma.about.create({
        data: { adminId, title, description, image },
      });
    }

    res.json(updatedOrNewAbout);
  } catch (error) {
    console.error("Error handling about detail:", error);
    res.status(500).json({ error: "Failed to handle about detail" });
  }
};

export { getAbout, editAbout };
