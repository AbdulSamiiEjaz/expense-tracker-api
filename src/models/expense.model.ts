import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import { Category } from "./category.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Expense {
  @prop({ required: true, min: 1 })
  amount: number;

  @prop({ required: true, ref: () => User })
  userId: Ref<User>;

  @prop({ required: true, ref: () => Category })
  categoryId: Ref<Category>;

  @prop({ required: true })
  expenseType: string;
}

const ExpenseModel = getModelForClass(Expense);
export default ExpenseModel;
