import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../middleware/validator";
import { validateRequest } from "../middleware/validateRequest";

const router = express.Router();

router.post("/register", validateRequest, validateRegisterUser, registerUser);
router.post("/login", validateLoginUser, validateRequest, loginUser);

export default router;
