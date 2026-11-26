
import { ICharacterRepository } from "../interfaces/character.repository.interface.js";
import { CharacterEntity } from "../../infra/persistence/typeorm/Character.entity.js";

type CreateCharacterInput = Omit<
    CharacterEntity,
    "id" | "createdAt" | "updatedAt"
>;

export class CreateCharacterUseCase {
    constructor(
        private readonly characterRepository: ICharacterRepository
    ) {}

    async execute(input: CreateCharacterInput) {
        return await this.characterRepository.create(input);
    }
}
