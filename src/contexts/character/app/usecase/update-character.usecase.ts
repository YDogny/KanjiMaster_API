
import { ICharacterRepository } from "../interfaces/character.repository.interface.js";
import { CharacterEntity } from "../../infra/persistence/typeorm/Character.entity.js";
import { CharacterError } from "../../domain/errors/character.error.js";

type UpdateCharacterInput = Partial<
    Omit<CharacterEntity, "id" | "createdAt" | "updatedAt">
>;

export class UpdateCharacterUseCase {
    constructor(
        private readonly characterRepository: ICharacterRepository
    ) {}

    async execute(id: number, input: UpdateCharacterInput) {
        const character = await this.characterRepository.update(id, input);

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
