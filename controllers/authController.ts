import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUser } from "../service/authService";
import { userData } from "../type/type";

// Register User
export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const userExists = await getUser(email);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const reqData: userData = {
      name,
      email,
      password: hashedPassword,
    };
    const user = await createUser(reqData);

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await getUser(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });
    res.status(200).json({ token, userId: user._id, email: user.email });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
