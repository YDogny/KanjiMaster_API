import { TypeOrmCharacterRepository } from "../../infra/persistence/typeorm/character.repository.js";

import { GetAllCharactersUseCase } from "../../app/usecase/get-all-characters.usecase.js";
import { GetCharacterByIdUseCase } from "../../app/usecase/get-character-by-id.usecase.js";
import { SearchCharactersUseCase } from "../../app/usecase/search-characters.usecase.js";
import { CreateCharacterUseCase } from "../../app/usecase/create-character.usecase.js";
import { UpdateCharacterUseCase } from "../../app/usecase/update-character.usecase.js";
import { DeleteCharacterUseCase } from "../../app/usecase/delete-character.usecase.js";

import { CharacterService } from "../../app/services/character.service.js";
import { CharacterHandler } from "../../app/handlers/character.handler.js";

// Repository
const characterRepository = new TypeOrmCharacterRepository();

// Use Cases
const getAllCharactersUseCase = new GetAllCharactersUseCase(characterRepository);
const getCharacterByIdUseCase = new GetCharacterByIdUseCase(characterRepository);
const searchCharactersUseCase = new SearchCharactersUseCase(characterRepository);
const createCharacterUseCase = new CreateCharacterUseCase(characterRepository);
const updateCharacterUseCase = new UpdateCharacterUseCase(characterRepository);
const deleteCharacterUseCase = new DeleteCharacterUseCase(characterRepository);

// Service
const characterService = new CharacterService(
    getAllCharactersUseCase,
    getCharacterByIdUseCase,
    searchCharactersUseCase,
    createCharacterUseCase,
    updateCharacterUseCase,
    deleteCharacterUseCase
);

// Handler
export const characterHandler = new CharacterHandler(characterService);