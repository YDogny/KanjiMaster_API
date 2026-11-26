import { SuccessResponse } from "../../../../core/http/success.response.js";

import { characterHandler } from "../app/character.dependencies.js";

import {
    createCharacterSchema,
    updateCharacterSchema,
    characterIdSchema,
    searchCharacterSchema,
} from "../../app/inputs/character.input.js";

import {
    presentCharacter,
    presentCharacters,
} from "../presenters/character.presenter.js";

export const getCharacters = async (req: any, res: any) => {
    const characters = await characterHandler.getAllCharacters();

    res.status(200).send(new SuccessResponse(presentCharacters(characters)));
};

export const getCharacterById = async (req: any, res: any) => {
    const { id } = characterIdSchema.parse(req.params);

    const character = await characterHandler.getCharacterById(id);

    res.status(200).send(new SuccessResponse(presentCharacter(character)));
};

export const searchCharacters = async (req: any, res: any) => {
    const { term } = searchCharacterSchema.parse({
        term: req.query.term,
    });

    const characters = await characterHandler.searchCharacters(term);

    res.status(200).send(new SuccessResponse(presentCharacters(characters)));
};

export const createCharacter = async (req: any, res: any) => {
    const data = createCharacterSchema.parse(req.body);

    const newCharacter = await characterHandler.createCharacter(data);

    res.status(201).send(new SuccessResponse(presentCharacter(newCharacter)));
};

export const updateCharacter = async (req: any, res: any) => {
    const { id } = characterIdSchema.parse(req.params);
    const data = updateCharacterSchema.parse(req.body);

    const changedCharacter = await characterHandler.updateCharacter(id, data);

    res.status(200).send(new SuccessResponse(presentCharacter(changedCharacter)));
};

export const deleteCharacter = async (req: any, res: any) => {
    const { id } = characterIdSchema.parse(req.params);

    const response = await characterHandler.deleteCharacter(id);

    res.status(200).send(new SuccessResponse(response));
};