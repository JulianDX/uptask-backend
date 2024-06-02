import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/routes";
import authRoutes from "./routes/authRoutes"
import cors from "cors";
import { corsConfig } from "./config/cors";

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

export default app;
