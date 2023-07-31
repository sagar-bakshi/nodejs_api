import bcrypt from "bcrypt";
import User from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("+password");
    res.json({
      sucess: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res) => {
  res.status(200).json({
    sucess: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({
      sucess: true,
      message: "Logged out!!!",
    });
};
