import type z from "zod";
import { loginSchema, registerSchema } from "@/schema/auth";

export type LogInFormFields = z.infer<typeof loginSchema>;
export type RegisterFormFields = z.infer<typeof registerSchema>;