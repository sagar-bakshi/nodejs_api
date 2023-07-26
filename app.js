import express, { urlencoded } from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backendapi",
  })
  .then(() => {
    console.log("Database is connected!!!");
  })
  .catch((e) => console.log(e));

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", schema);

app.get("/", (req, res) => {
  res.send("nice working");
});

app.get("/user/all", async (req, res) => {
  const users = await User.find({});

  res.json({
    sucess: true,
    users,
  });
});

app.post("/user/new", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res
    .status(201)
    .cookie("temp", "mycookie")
    .json({
      success: true,
      message: `${user.name} has been create`,
    });
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
  // res.json({
  //   success: true,
  //   message: "query passed",
  // });
});

app.listen(4000, () => {
  console.log("Server is listing on port 4000");
});
