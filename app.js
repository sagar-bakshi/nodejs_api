import express from "express";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/tasks.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.js";

config({
  path: "./config.env",
});

export const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
//Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to our api service</h1>");
});
