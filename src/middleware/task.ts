import { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export const verifyTaskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  const { projectId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(400).json({ error: "No se ha encontrado la tarea" });
    }
    req.task = task;
    if (task.project.toString() !== projectId) {
      res
        .status(403)
        .json({ error: "La tarea no coincide con el proyecto seleccionado" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
