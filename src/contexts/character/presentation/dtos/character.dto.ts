import { CharacterType } from "../../infra/persistence/typeorm/Character.entity.js";

export interface CharacterDTO {
    id: number;
    character: string;
    type: CharacterType;
    romaji: string | null;
    meaning: string | null;
    strokes: number | null;
    onYomi: string | null;
    kunYomi: string | null;
    createdAt: Date;
    updatedAt: Date;
}