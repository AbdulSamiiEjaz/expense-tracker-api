import express from "express";
import ExpenseController from "../controllers/expenses.controller";
import validateResource from "../middlewares/validateResource";
import { createExpenseSchema } from "../schema/expense.schema";
import { extractPaginationAndSortingParams } from "../middlewares/sortingAndPagination.middleware";
import verifyUser from "../middlewares/jwt.middleware";

const expenseRouter = express.Router();

expenseRouter.get(
  "/api/expenses",
  extractPaginationAndSortingParams,
  verifyUser,
  ExpenseController.index
);
expenseRouter.post(
  "/api/expenses",
  verifyUser,
  validateResource(createExpenseSchema),
  ExpenseController.store
);
expenseRouter.put("/api/expenses", verifyUser, ExpenseController.update);
expenseRouter.get("/api/expenses/:id", verifyUser, ExpenseController.show);
expenseRouter.delete("/api/expenses", verifyUser, ExpenseController.delete);

export default expenseRouter;
