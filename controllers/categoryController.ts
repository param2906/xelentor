import { Request, Response } from "express";
import {
  create,
  getCategoryTreeService,
  updateCategoryService,
  deleteCategoryService,
  getCategoryById,
  updateManyCategories,
} from "../service/categoryService";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({ message: "Name is Required" });
    }
    const category = await create(req.body);
    return res
      .status(201)
      .json({ message: "Category registered successfully", category });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const buildCategoryTree = async (parent: string | null = null) => {
  const categories = await getCategoryTreeService(parent);
  return Promise.all(
    categories.map(
      async (category: any): Promise<any> => ({
        _id: category._id,
        name: category.name,
        status: category.status,
        children: await buildCategoryTree(category._id),
      })
    )
  );
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const tree = await buildCategoryTree();
    return res
      .status(200)
      .json({ message: "Category retrived successfully", tree });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { status } = req.body;
    const category = await updateCategoryService(req.params.id, req.body);

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }
    if (status) {
      await updateSubCategory(req.params.id, status);
    }

    return res
      .status(200)
      .json({ message: "category updated successfully", category });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const updateSubCategory = async (
  parent: string | null = null,
  status: string
): Promise<any> => {
  const categories = await getCategoryTreeService(parent);
  return Promise.all(
    categories.map(async (category: any) => {
      await updateCategoryService(category._id, { status });
      await updateSubCategory(category._id, status);
    })
  );
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    await updateManyCategories(
      { parent: category._id },
      { parent: category.parent }
    );
    await deleteCategoryService(category._id);
    return res.status(200).json({ message: "Category deleted" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
