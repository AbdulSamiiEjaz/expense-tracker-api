import ExpenseModel, { Expense } from "../models/expense.model";

export function createExpense(input: Partial<Expense>) {
  return ExpenseModel.create(input);
}

export function getAllExpenses() {
  return ExpenseModel.find();
}
export function findExpenseById(id: string) {
  return ExpenseModel.findById(id);
}
export function findExpenseByTitleAndUser(userId: string, title: string) {
  return ExpenseModel.findOne({
    $and: [{ userId }, { title }],
  });
}
