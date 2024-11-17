import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { usersRouter } from "./routes/users";
import { authRouter } from "./routes/auth";

// Load env variables
dotenv.config();

const app: Express = express();

// Applying cookie parser and json middleware
app.use(cookieParser());
app.use(express.json());

// Using app routers
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// Basic health check endpoint
app.get("/health", (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

// Exported for usage in tests
export { app };
