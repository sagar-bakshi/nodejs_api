import express from "express";
import userRouter from "./routes/userRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

config({
  path: "./config.env",
});

//Middlewares
app.use(express.json());
app.use(cookieParser);
//Using routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to our api service</h1>");
});

app.use("/api/v1/users", userRouter);
