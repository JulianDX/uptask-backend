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
      res.status(201).json({ msg: "Tarea creada" });
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

  static updateTask = async (req: Request, res: Response) => {
    try {
      const task = req.task;
      task.taskName = req.body.taskName;
      task.description = req.body.description;
      task.save();
      res.status(200).json({ msg: "Tarea actualizada" });
    } catch (error) {
      console.log(error);
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      const newTaskArray = req.project.tasks.filter((task) => {
        if (task.toString() !== req.task.id.toString()) {
          return task;
        }
      });
      req.project.tasks = newTaskArray;
      await Promise.allSettled([Task.findByIdAndDelete(req.task.id), req.project.save()]);
      res.status(200).json({ msg: "Tarea eliminada" });
    } catch (error) {
      console.log(error);
    }
  };
}
