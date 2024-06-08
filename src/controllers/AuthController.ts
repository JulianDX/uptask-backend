import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
  static async createAccount(req: Request, res: Response) {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        const error = new Error(
          "Ya existe un usuario registrado con ese correo"
        );
        return res.status(409).json({ error: error.message });
      }
      const user = new User(req.body);
      // Hash Password
      user.password = await hashPassword(req.body.password);
      // Generar Token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;
      await AuthEmail.sendConfirmationEmail({
        email: user.email,
        token: token.token,
        name: user.name,
      });
      await Promise.allSettled([token.save(), user.save()]);
      res.send("Cuenta creada, revisa tu email para confirmarla");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }

  static async confirmAccount(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Token no válido");
        return res.status(404).json({ error: error.message });
      }
      const user = await User.findById(tokenExists.user);
      user.confirmed = true;
      await Promise.allSettled([tokenExists.deleteOne(), user.save()]);
      res.send("Cuenta confirmada, ya puedes iniciar sesión");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const userExists = await User.findOne({ email });
      if (!userExists) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
}
