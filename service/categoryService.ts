import { Category } from "../models/categoryModel";
import mongoose from "mongoose";

export const create = async (data: any) => {
  return await Category.create(data);
};

export const getCategoryTreeService = async (parent: string | null = null) => {
  return await Category.find({ parent });
};

export const updateCategoryService = async (id: string, data: any) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const getCategoryById = async (id: string) => {
  return await Category.findById(id);
};

export const deleteCategoryService = async (id: any) => {
  return await Category.findByIdAndDelete(id);
};

export const updateManyCategories = async (parent: any, reqData: any) => {
  return await Category.updateMany(parent, reqData);
};
