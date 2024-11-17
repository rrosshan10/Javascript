import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import { registerValidators, loginValidators, validate } from "../utils/validator.js";

const router = express.Router();

// Authentication routes
router.post("/register", registerValidators, validate, registerUser);
router.post("/login", loginValidators, validate, loginUser);
router.post("/logout", logoutUser);

export default router;
