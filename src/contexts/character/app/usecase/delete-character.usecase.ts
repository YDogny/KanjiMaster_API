
import { ICharacterRepository } from "../interfaces/character.repository.interface.js";
import { CharacterError } from "../../domain/errors/character.error.js";

export class DeleteCharacterUseCase {
    constructor(
        private readonly characterRepository: ICharacterRepository
    ) {}

    async execute(id: number): Promise<void> {
        const deleted = await this.characterRepository.delete(id);

        if (!deleted) {
            throw new CharacterError(
                "Caractère introuvable.",
                404,
                "er-character-404"
            );
        }
    }
}
