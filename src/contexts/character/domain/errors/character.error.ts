
export class CharacterError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number = 400,
        public readonly errId: string = "er-character-400"
    ) {
        super(message);
        this.name = "CharacterError";
    }
}
