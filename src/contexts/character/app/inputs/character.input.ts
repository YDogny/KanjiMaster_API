
import { z } from "zod";
import { CharacterType } from "../../infra/persistence/typeorm/Character.entity.js";

// Validation lors de la création d'un caractère
export const createCharacterSchema = z.object({
    character: z.string()
        .min(1, "Le caractère est obligatoire.")
        .max(10, "Le caractère ne doit pas dépasser 10 caractères."),

    type: z.nativeEnum(CharacterType),

    romaji: z.string().max(100).nullable().default(null),

    meaning: z.string().max(255).nullable().default(null),

    strokes: z.number().int().positive().nullable().default(null),

    onYomi: z.string().max(255).nullable().default(null),

    kunYomi: z.string().max(255).nullable().default(null),
});

// Validation lors de la modification
export const updateCharacterSchema = createCharacterSchema.partial();

// Validation d'un identifiant
export const characterIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

// Validation d'une recherche
export const searchCharacterSchema = z.object({
    term: z.string()
        .trim()
        .min(1, "Le terme de recherche est obligatoire.")
        .max(100, "Le terme de recherche est trop long."),
});

// Types déduits automatiquement des validations
export type CreateCharacterInput = z.infer<typeof createCharacterSchema>;

export type UpdateCharacterInput = z.infer<typeof updateCharacterSchema>;

export type CharacterIdInput = z.infer<typeof characterIdSchema>;

export type SearchCharacterInput = z.infer<typeof searchCharacterSchema>;
