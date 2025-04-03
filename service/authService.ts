import User, { IUser } from "../models/userModel";
import { userData, email } from "../type/type";
import { Document } from "mongoose";

export const createUser = async (reqData: userData) => {
  return User.create(reqData);
};

export const getUser = async (email: string) => {
  return User.findOne({ email: email });
};
