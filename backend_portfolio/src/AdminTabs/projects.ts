import { Request, Response } from "express";
import { prisma } from "../prismaDb/prismaDb";

interface CustomRequest extends Request {
  user?: { adminId: string };
}

const getProjects = async (req: CustomRequest, res: Response) => {
  try {
    const projects = await prisma.projects.findMany();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the projects" });
  }
};

const addProjects = async (req: CustomRequest, res: Response) => {
  const { adminId } = req.user || {};
  const { image, title, description, link, icon, githubLink } = req.body;

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!image || !title || !description || !link || !icon) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const project = await prisma.projects.create({
      data: {
        title,
        description,
        image,
        icon,
        link,
        githubLink,
        adminId,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add the project" });
  }
};

const editProjects = async (req: CustomRequest, res: Response) => {
  console.log("editProjects");
  const { id } = req.params;
  const { image, title, description, link, icon, githubLink } = req.body;
  const { adminId } = req.user || {};

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!image || !title || !description || !link || !icon) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const project = await prisma.projects.update({
      where: {
        id,
      },
      data: {
        title,
        icon,
        description,
        image,
        githubLink,
        link,
      },
    });

    if (!project) {
      res.status(404).json({ error: "Project not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the project" });
  }
};

const deleteProjects = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { adminId } = req.user || {};

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const project = await prisma.projects.delete({
      where: {
        id,
      },
    });

    if (!project) {
      res.status(404).json({ error: "Project not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the project" });
  }
};

export { addProjects, getProjects, editProjects, deleteProjects };
