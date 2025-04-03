import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { authentication } from "../middleware/authMiddleware";
import { validateId, validateCategory } from "../middleware/validator";
import { validateRequest } from "../middleware/validateRequest";

const router = express.Router();

router.post(
  "/",
  authentication,
  validateCategory,
  validateRequest,
  createCategory
);
router.get("/", authentication, getCategories);
router.put("/:id", authentication, validateId, updateCategory);
router.delete(
  "/:id",
  authentication,
  validateId,
  validateRequest,
  deleteCategory
);

export default router;
