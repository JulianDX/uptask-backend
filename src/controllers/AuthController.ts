import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
  static async createAccount(req: Request, res: Response) {
    try {
      const user = new User(req.body);
      // Hash Password
      user.password = await hashPassword(req.body.password);
      await user.save();
      res.send("Cuenta creada, revisa tu email para confirmarla");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
}
