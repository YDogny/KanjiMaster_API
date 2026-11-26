import { CharacterService } from "../services/character.service.js";
import {
    CreateCharacterInput,
    UpdateCharacterInput,
} from "../inputs/character.input.js";

export class CharacterHandler {

    constructor(private readonly characterService: CharacterService) {}

    async getAllCharacters() {
        return await this.characterService.findAll();
    }

    async getCharacterById(id: number) {
        return await this.characterService.findById(id);
    }

    async searchCharacters(term: string) {
        return await this.characterService.search(term);
    }

    async createCharacter(data: CreateCharacterInput) {
        return await this.characterService.create(data);
    }

    async updateCharacter(id: number, data: UpdateCharacterInput) {
        return await this.characterService.update(id, data);
    }

    async deleteCharacter(id: number) {
        return await this.characterService.delete(id);
    }
}