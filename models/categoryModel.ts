// src/models/Category.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  parent?: mongoose.Types.ObjectId | null;
  status: "active" | "inactive";
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
