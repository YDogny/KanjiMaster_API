
import { z } from "zod";

export const registerAuthSchema = z.object({
    username: z
        .string()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
        .max(50, "Le nom d'utilisateur ne peut pas dépasser 50 caractères"),

    email: z.email("Adresse email invalide")
        .max(255, "L'adresse email est trop longue"),

    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const loginAuthSchema = z.object({
    email: z.email("Adresse email invalide"),

    password: z
        .string()
        .min(1, "Le mot de passe est obligatoire"),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, "Le Refresh Token est obligatoire"),
});

export const logoutSchema = refreshTokenSchema;

export type RegisterAuthInput = z.infer<typeof registerAuthSchema>;
export type LoginAuthInput = z.infer<typeof loginAuthSchema>;
