import { loginSchema, registerSchema } from '@/schema/auth';
import type z from 'zod';

export type LogInFormFields = z.infer<typeof loginSchema>;
export type RegisterFormFields = z.infer<typeof registerSchema>;
