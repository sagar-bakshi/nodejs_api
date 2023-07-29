import express from "express";
import userRouter from "./routes/userRoutes.js";
import { config } from "dotenv";

export const app = express();

config({
  path: "./config.env",
});

//Middlewares
app.use(express.json());

//handling the routes
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to our api service</h1>");
});
