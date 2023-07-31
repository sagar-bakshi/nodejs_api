import ErrorHandler from "../middleware/error.js";
import Task from "../models/task.js";

export const create = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(200).json({
      success: true,
      message: "Task has been created!",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getMytask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    task.isComplted = !task.isComplted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task has been updated",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Internal Server Error", 500));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
