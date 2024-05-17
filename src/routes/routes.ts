import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { verifyProjectExists } from "../middleware/project";
import { verifyTaskExists } from "../middleware/task";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get(
  "/:projectId",
  param("projectId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.getProjectByID
);
router.post(
  "/create",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);

router.put(
  "/update/:id",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.updateProject
);
router.delete(
  "/delete/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.deleteProject
);

/**
 *    ---------------------------- TASKS --------------------------
 **/

router.get(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  verifyProjectExists,
  TaskController.getAllTasks
);

router.post(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("ID no válido"),
  body("taskName")
    .notEmpty()
    .withMessage("El nombre de la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la tarea es obligatoria"),
  handleInputErrors,
  verifyProjectExists,
  TaskController.createTask
);

router.put(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID del proyecto no válido"),
  param("taskId").isMongoId().withMessage("ID de la tarea no válido"),
  body("taskName")
    .notEmpty()
    .withMessage("El nombre de la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la tarea es obligatoria"),
  handleInputErrors,
  verifyProjectExists,
  verifyTaskExists,
  TaskController.updateTask
);

router.put(
  "/:projectId/tasks/:taskId/status",
  param("projectId").isMongoId().withMessage("ID del proyecto no válido"),
  param("taskId").isMongoId().withMessage("ID de la tarea no válido"),
  body("taskStatus")
    .notEmpty()
    .withMessage("El estado de la tarea es obligatorio"),
  handleInputErrors,
  verifyProjectExists,
  verifyTaskExists,
  TaskController.updateTaskStatus
);

router.delete(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID del proyecto no válido"),
  param("taskId").isMongoId().withMessage("ID de la tarea no válido"),
  handleInputErrors,
  verifyProjectExists,
  verifyTaskExists,
  TaskController.deleteTask
);

export default router;
