import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("Email no válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña es muy corta"),
  body("password_confirm").custom((input, { req }) => {
    if (req.body.password !== input) {
      throw new Error("Las contraseñas no coinciden");
    } else {
      return true;
    }
  }),
  handleInputErrors,
  AuthController.createAccount
);

export default router;
