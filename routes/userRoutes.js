import express from "express";
import {
  createNewUser,
  deleteUserbyId,
  getAllUsers,
  getUserbyId,
  updateUserbyId,
} from "../controller/user.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", createNewUser);

router
  .route("/:id")
  .get(getUserbyId)
  .put(updateUserbyId)
  .delete(deleteUserbyId);

export default router;
