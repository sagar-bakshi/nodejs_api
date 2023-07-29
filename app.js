import express from "express";
import userRouter from "./routes/userRoutes.js";

export const app = express();

//Middlewares
app.use(express.json());

//handling the routes
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to our api service</h1>");
});
