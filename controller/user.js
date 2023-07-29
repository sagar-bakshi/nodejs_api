import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    sucess: true,
    users,
  });
};

export const createNewUser = async (req, res) => {
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
};

export const getUserbyId = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
};

export const updateUserbyId = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    message: "update...",
    user,
  });
};

export const deleteUserbyId = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  await User.deleteOne(id);

  res.status(200).json({
    success: true,
    message: "Deleted....",
  });
};
