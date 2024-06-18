import { TypeOf, z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      firstName: z.string({
        required_error: "First name is required!",
      }),
      lastName: z.string({
        required_error: "Last name is required!",
      }),
      email: z
        .string({
          required_error: "Email is required!",
        })
        .email("Must be an valid email!"),
      username: z.string({
        required_error: "Username is required!",
      }),
      password: z
        .string({
          required_error: "Password is required!",
        })
        .min(6, "Password must be atleast 6 characters!"),
      password_confirmation: z
        .string({
          required_error: "Password Confirmation is required!",
        })
        .min(6, "Password must be atleast 6 characters!"),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords do not match!",
      path: ["password_confirmation"],
    }),
});

export type createUserInput = TypeOf<typeof createUserSchema>["body"];
