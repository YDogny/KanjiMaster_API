
export class AuthError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number = 401,
        public readonly errId: string = "er-auth-401"
    ) {
        super(message);
        this.name = "AuthError";
    }
}
