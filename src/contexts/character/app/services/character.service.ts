
import { GetAllCharactersUseCase } from "../usecase/get-all-characters.usecase.js";
import { GetCharacterByIdUseCase } from "../usecase/get-character-by-id.usecase.js";
import { SearchCharactersUseCase } from "../usecase/search-characters.usecase.js";
import { CreateCharacterUseCase } from "../usecase/create-character.usecase.js";
import { UpdateCharacterUseCase } from "../usecase/update-character.usecase.js";
import { DeleteCharacterUseCase } from "../usecase/delete-character.usecase.js";

import {
    CreateCharacterInput,
    UpdateCharacterInput,
} from "../inputs/character.input.js";

export class CharacterService {
    constructor(
        private readonly getAllCharactersUseCase: GetAllCharactersUseCase,
        private readonly getCharacterByIdUseCase: GetCharacterByIdUseCase,
        private readonly searchCharactersUseCase: SearchCharactersUseCase,
        private readonly createCharacterUseCase: CreateCharacterUseCase,
        private readonly updateCharacterUseCase: UpdateCharacterUseCase,
        private readonly deleteCharacterUseCase: DeleteCharacterUseCase
    ) {}

    async findAll() {
        return await this.getAllCharactersUseCase.execute();
    }

    async findById(id: number) {
        return await this.getCharacterByIdUseCase.execute(id);
    }

    async search(term: string) {
        return await this.searchCharactersUseCase.execute(term);
    }

    async create(input: CreateCharacterInput) {
        return await this.createCharacterUseCase.execute(input);
    }

    async update(id: number, input: UpdateCharacterInput) {
        return await this.updateCharacterUseCase.execute(id, input);
    }

    async delete(id: number) {
        return await this.deleteCharacterUseCase.execute(id);
    }
}
