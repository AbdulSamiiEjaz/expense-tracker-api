import { z, TypeOf } from "zod";

export const categorySchema = z.object({
  body: z.object({
    title: z.string().min(1).max(20),
  }),
});

export type categorySchemaInput = TypeOf<typeof categorySchema>["body"];
