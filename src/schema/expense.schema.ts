import { TypeOf, z } from "zod";

export const createExpenseSchema = z.object({
  body: z.object({
    amount: z.number().min(1),
    categoryId: z.string(),
    expenseType: z.enum(["spent", "received"]),
  }),
});

export type createExpenseSchemaInput = TypeOf<
  typeof createExpenseSchema
>["body"];
