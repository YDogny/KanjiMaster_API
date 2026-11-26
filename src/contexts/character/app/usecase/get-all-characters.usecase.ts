
import { ICharacterRepository } from "../interfaces/character.repository.interface.js";

export class GetAllCharactersUseCase {
    constructor(
        private readonly characterRepository: ICharacterRepository
    ) {}

    async execute() {
        return await this.characterRepository.findAll();
    }
}
