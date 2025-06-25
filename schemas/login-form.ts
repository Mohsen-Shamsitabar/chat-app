import { z } from "zod/v4";

export const loginFormSchema = z
  .object({
    username: z.string().min(4).max(16).nonempty().nonoptional(),
  })
  .required();

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
