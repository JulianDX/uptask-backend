import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      const project = req.project;
      project.tasks.push(task);
      task.project = project.id;
      await Promise.allSettled([task.save(), project.save()]);
      res.json({ msg: "Tarea creada" });
    } catch (error) {
      console.log(error);
    }
  };

  static getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id });
      res.json(tasks);
    } catch (error) {
      console.log(error);
    }
  };
}
