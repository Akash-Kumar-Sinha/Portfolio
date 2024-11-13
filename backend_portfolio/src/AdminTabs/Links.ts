import { Request, Response } from "express";
import { prisma } from "../prismaDb/prismaDb";

interface CustomRequest extends Request {
  user?: { adminId: string };
}

const getLink = async (req: CustomRequest, res: Response) => {
  try {
    const links = await prisma.link.findMany();

    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the links" });
  }
};

const addLink = async (req: CustomRequest, res: Response) => {
  const { adminId } = req.user || {};
  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { name, url, icon } = req.body;

  if (!name || !url || !icon) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const newLink = await prisma.link.create({
      data: {
        name,
        url,
        icon,
        adminId,
      },
    });

    res.status(201).json(newLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add the link" });
  }
};

const editLink = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { name, url, icon } = req.body;
  const { adminId } = req.user || {};

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!name || !url || !icon) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const existingLink = await prisma.link.findUnique({ where: { id } });

    if (!existingLink) {
      res.status(404).json({ error: "Link not found" });
      return;
    }

    if (existingLink.adminId !== adminId) {
      res
        .status(403)
        .json({ error: "You don't have permission to edit this link" });
      return;
    }

    const updatedLink = await prisma.link.update({
      where: { id },
      data: { name, url, icon },
    });

    res.status(200).json(updatedLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the link" });
  }
};

const deleteLink = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { adminId } = req.user || {};

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const existingLink = await prisma.link.findUnique({ where: { id } });

    if (!existingLink) {
      res.status(404).json({ error: "Link not found" });
      return;
    }

    if (existingLink.adminId !== adminId) {
      res
        .status(403)
        .json({ error: "You don't have permission to delete this link" });
      return;
    }

    await prisma.link.delete({ where: { id } });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the link" });
  }
};

export { addLink, getLink, editLink, deleteLink };
