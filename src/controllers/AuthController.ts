import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
  static async createAccount(req: Request, res: Response) {
    try {
      const user = new User(req.body);
      const userExists = User.findOne({ email: req.body.email });
      if (userExists) {
        const error = new Error(
          "Ya existe un usuario registrado con ese correo"
        );
        res.status(409).json({ error: error.message });
      }
      // Hash Password
      user.password = await hashPassword(req.body.password);
      await user.save();
      res.send("Cuenta creada, revisa tu email para confirmarla");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
}
