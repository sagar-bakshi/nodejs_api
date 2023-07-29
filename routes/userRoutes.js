import express from "express";
import { getAllUsers, login, register } from "../controller/user.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.post("/register", register);
router.post("/login", login);

export default router;
