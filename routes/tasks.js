import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  create,
  deleteTask,
  getMytask,
  updateTask,
} from "../controller/task.js";

const router = express.Router();

router.post("/create", isAuthenticated, create);
router.get("/mytask", isAuthenticated, getMytask);
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
