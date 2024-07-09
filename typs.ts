import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  username: z.string().optional(),
  grade: z.string().optional(),
  name: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  apikey: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;