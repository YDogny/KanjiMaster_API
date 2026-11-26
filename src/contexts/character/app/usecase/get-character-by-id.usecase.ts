
import { ICharacterRepository } from "../interfaces/character.repository.interface.js";
import { CharacterError } from "../../domain/errors/character.error.js";

export class GetCharacterByIdUseCase {
    constructor(
        private readonly characterRepository: ICharacterRepository
    ) {}

    async execute(id: number) {
        const character = await this.characterRepository.findById(id);

        if (!character) {
            throw new CharacterError(
                "Caractère introuvable.",
                404,
                "er-character-404"
            );
        }

        return character;
    }
}
