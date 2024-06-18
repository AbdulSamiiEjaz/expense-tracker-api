import { Request, Response } from "express";
import { categorySchemaInput } from "../schema/category.schema";
import {
  createCategory,
  findCategoryByTitleAndUser,
} from "../services/category.service";
import log from "../utils/logger";
import mongoose from "mongoose";

export class Category {
  async index(req: Request, res: Response) {}
  async show(req: Request, res: Response) {}
  async store(req: Request<{}, {}, categorySchemaInput>, res: Response) {
    try {
      const user = req.user;

      const { title } = req.body;
      console.log(user);
      const doesCategoryExists = await findCategoryByTitleAndUser(
        user._id,
        title
      );

      if (doesCategoryExists) {
        return res.status(400).json({
          errors: "Category already exists!",
        });
      }

      const category = await createCategory({
        title,
        userId: new mongoose.Types.ObjectId(user._id),
      });

      return res.status(201).json({
        message: "Category created successfully!",
        id: category._id,
      });
    } catch (error) {
      log.error(error);
      return res.status(500).json({
        errors: "Something went wrong...",
      });
    }
  }
  async update(req: Request, res: Response) {}
  async delete(req: Request, res: Response) {}
}

export default new Category();
