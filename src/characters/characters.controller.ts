import * as charactersServices from "./characters.services.ts";

export const getCharacters = (req, res) => {
    const characters = charactersServices.getCharacters();
    res.status(200).send(characters);
};