import express from "express";
import userRouter from "./routes/userRoutes.js";
import { config } from "dotenv";

export const app = express();

config({
  path: "./config.env",
});

//Middlewares
app.use(express.json());

//Using routes
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to our api service</h1>");
});
