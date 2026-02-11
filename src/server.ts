// src/server.ts
import express, { Application } from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { prisma } from "./config/prisma.js";

dotenv.config();

const app:Application = express();
app.use(express.json());

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5001;

app.use("/api", apiRouter);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("It is working!"));

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
