import express from "express";
import { createNewUser, getAllUsers, getUserbyId } from "../controller/user.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", createNewUser);

router.get("/:id", getUserbyId);

export default router;
