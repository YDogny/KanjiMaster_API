
import { ICharacterRepository } from "../interfaces/character.repository.interface.js";

export class SearchCharactersUseCase {
    constructor(
        private readonly characterRepository: ICharacterRepository
    ) {}

    async execute(term: string) {
        return await this.characterRepository.search(term.trim());
    }
}
