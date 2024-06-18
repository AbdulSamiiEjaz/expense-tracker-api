import { Request, Response } from "express";
import { createExpenseSchemaInput } from "../schema/expense.schema";
import log from "../utils/logger";
import { createExpense } from "../services/expense.service";
import mongoose from "mongoose";

export class ExpenseController {
  async index(req: Request, res: Response) {}
  async show(req: Request, res: Response) {}
  async store(req: Request<{}, {}, createExpenseSchemaInput>, res: Response) {
    try {
      const user = req.user;

      const expense = await createExpense({
        userId: new mongoose.Types.ObjectId(user._id),
        categoryId: new mongoose.Types.ObjectId(req.body.categoryId),
        amount: req.body.amount,
        expenseType: req.body.expenseType,
      });

      return res
        .status(201)
        .json({ message: "Expense created successfull!", id: expense._id });
    } catch (error) {
      log.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
  async update(req: Request, res: Response) {}
  async delete(req: Request, res: Response) {}
}

export default new ExpenseController();
