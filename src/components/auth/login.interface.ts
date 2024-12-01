import { z } from "zod";

export interface loginInterface {
  email: string;
  password: string;
}

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
