import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  // Get all projects

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  // Get project by ID

  static getProjectByID = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    try {
      const project = await Project.findById(projectId);
      res.json(project);
    } catch (error) {
      console.log(error);
    }
  };

  // Create project

  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    try {
      await project.save();
      res.json("Proyecto creado con éxito");
    } catch (error) {
      console.log(error);
    }
  };

  // Update project

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
      }
      const updatedProduct = await Project.findByIdAndUpdate(id, req.body);
      await updatedProduct.save();
      res.json("Actualizado con éxito");
    } catch (error) {
      console.log(error);
    }
  };

  // Delete project

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
      }
      await project.deleteOne();
      res.json("Eliminado con éxito");
    } catch (error) {
      console.log(error);
    }
  };
}