import { z } from "zod";

export const createUserSchema = z.strictObject({
    username: z.string().trim().min(2).max(50),
    email: z.email(),
    password: z.string().min(8),
});