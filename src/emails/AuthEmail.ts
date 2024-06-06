import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  token: string;
  name: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async ({ email, token, name }: IEmail) => {
    //Enviar Email
    transporter.sendMail({
      from: "Uptask <admin@uptask.com>",
      to: email,
      subject: "Confirmación Cuenta - Uptask",
      text: `Bienvenido a Uptask ${name}, el token para confirmar la cuenta es: ${token}`,
      html: `<p>Bienvenido a Uptask ${name}, el token para confirmar la cuenta es: ${token}</p>`,
    });
  };
}
