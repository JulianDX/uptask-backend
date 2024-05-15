import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { verifyProjectExists } from "../middleware/project";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
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

export default router;
