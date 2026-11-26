import { CharacterEntity } from "../../infra/persistence/typeorm/Character.entity.js";
import { CharacterDTO } from "../dtos/character.dto.js";

export const presentCharacter = (character: CharacterEntity): CharacterDTO => ({
    id: character.id,
    character: character.character,
    type: character.type,
    romaji: character.romaji,
    meaning: character.meaning,
    strokes: character.strokes,
    onYomi: character.onYomi,
    kunYomi: character.kunYomi,
    createdAt: character.createdAt,
    updatedAt: character.updatedAt,
});

export const presentCharacters = (characters: CharacterEntity[]): CharacterDTO[] => {
    return characters.map(presentCharacter);
};