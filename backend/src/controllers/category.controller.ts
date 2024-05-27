import { Request, Response } from "express";

import { Category } from "../models/category.model";

export class CategoryController {
  static async getAllCategories(req: Request, res: Response) {
    try {
      const { sort } = req.query;
      const categories = await Category.find().sort(
        sort ? { [sort as string]: 1 } : {}
      );
      return res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const category = await new Category({ name }).save({});
      return res.status(201).json(category);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);
      if (!category) {
        throw new Error("category not found");
      }

      await Category.findByIdAndDelete(id);

      res.status(200).json({ message: "deleted category successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
