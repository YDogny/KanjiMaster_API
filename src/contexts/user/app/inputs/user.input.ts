import { z } from "zod";

export const createUserSchema = z.strictObject({
    username: z.string().trim().min(2).max(50),
    email: z.email(),
    password: z.string().min(8),
});

export const updateUserSchema = z.strictObject({
    username: z.string().trim().min(2).max(50).optional(),
    email: z.email().optional(),
    password: z.string().min(8).optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Au moins un champ doit être renseigné",
    }
);