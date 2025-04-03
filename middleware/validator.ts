import { body, ValidationChain, param } from "express-validator";

export const validateRegisterUser: ValidationChain[] = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateLoginUser: ValidationChain[] = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateCategory: ValidationChain[] = [
  body("name").notEmpty().withMessage("Name is required"),
  body("status")
    .isIn(["active", "inactive"])
    .withMessage('Status must be either "active" or "inactive"'),
];

export const validateId: ValidationChain[] = [
  param("id").isMongoId().withMessage("Invalid category ID format"),
];
