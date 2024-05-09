import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.BACKEND_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(
      colors.bgCyan.bold(`Conexión exitosa a la base de datos en: ${url}`)
    );
  } catch (error) {
    console.log(colors.bgRed.bold("Fallo conectando a la base de datos"));
    exit(1);
  }
};
