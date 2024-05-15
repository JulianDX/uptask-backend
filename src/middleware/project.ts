import { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export const verifyProjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(400).json({ error: "No se ha encontrado el proyecto" });
    }
    req.project = project;
    next();
  } catch (error) {
    console.log(error);
  }
};
