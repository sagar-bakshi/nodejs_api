import bcrypt from "bcrypt";
import User from "../models/user.js";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({
    sucess: true,
    users,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "Invalid Email or Password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(409).json({
      sucess: false,
      message: "Invalid Email or Password",
    });
  }

  sendCookie(user, res, `Welcome back, ${user.name}`, 200);
};

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

  sendCookie(user, res, `${user.name} has been created`, 201);
};

export const getMyProfile = async (req, res) => {
  const id = "myId";

  const { token } = req.cookies;

  console.log(token);

  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    user,
  });
};
