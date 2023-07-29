import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({
    sucess: true,
    users,
  });
};

export const login = async (req, res, next) => {};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      sucess: false,
      error: "User already exists",
      message:
        "The username you provided already exists. Please choose a different username.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      sucess: true,
      message: "User Register Successfully",
    });
};
