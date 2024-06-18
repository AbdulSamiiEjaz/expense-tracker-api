import { z, TypeOf } from "zod";

export const loginSchema = z.object({
  body: z.object({
    identifier: z.string(),
    password: z.string().min(6),
  }),
});

export type loginSchemaInput = TypeOf<typeof loginSchema>["body"];
