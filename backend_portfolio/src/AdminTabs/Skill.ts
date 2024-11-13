import { Request, Response } from "express";
import { prisma } from "../prismaDb/prismaDb";

interface CustomRequest extends Request {
  user?: { adminId: string };
}

const getSkill = async (req: CustomRequest, res: Response) => {


  try {
    const skills = await prisma.skills.findMany();

    if (skills.length === 0) {
      res.status(200).json([]);
      return 
    }

    res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Error fetching skills" });
  }
};

const addSkill = async (req: CustomRequest, res: Response) => {
  const { adminId } = req.user || {};

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const { name, image } = req.body;

  try {
    const newSkill = await prisma.skills.create({
      data: {
        name,
        image,
        adminId,
      },
    });
    res.status(201).json(newSkill);
  } catch (error) {
    console.error("Error adding skill:", error);
    res.status(500).json({ message: "Error adding skill" });
  }
};

const editSkill = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { name, image } = req.body;
  const { adminId } = req.user || {};

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!name || !image) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const existingSkill = await prisma.skills.findUnique({ where: { id } });

    if (!existingSkill) {
      res.status(404).json({ error: "skill not found" });
      return;
    }

    if (existingSkill.adminId !== adminId) {
      res
        .status(403)
        .json({ error: "You don't have permission to edit this skill" });
      return;
    }

    const updatedSkill = await prisma.skills.update({
      where: { id },
      data: {
        name,
        image,
      },
    });
    res.status(200).json(updatedSkill);
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ message: "Error updating skill" });
  }
};

const deleteSkill = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { adminId } = req.user || {};

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const existingSkill = await prisma.skills.findUnique({ where: { id } });

    if (!existingSkill) {
      res.status(404).json({ error: "skill not found" });
      return;
    }

    if (existingSkill.adminId !== adminId) {
      res
        .status(403)
        .json({ error: "You don't have permission to edit this skill" });
      return;
    }

    await prisma.skills.delete({
      where: { id },
    });
    res.status(204).json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ message: "Error deleting skill" });
  }
};

export { getSkill, addSkill, deleteSkill, editSkill };
