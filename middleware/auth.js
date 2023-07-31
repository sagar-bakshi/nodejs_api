import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(409).json({
        sucess: false,
        message: "Login First!",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id);

    next();
  } catch (error) {
    console.log(error);
  }
};
