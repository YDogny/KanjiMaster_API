import { ErrorResponse } from "../../../core/http/error.response.js";

export class UserNotFound extends ErrorResponse {
    // Fonctions GET (getUsers, getUserById, GetUserByEmail) et PUT (updateUser)
    constructor() {
        super(404, `User not found`, "err-use-01");
    }
}

export class UserAlreadyExists extends ErrorResponse {
    // Fonctions POST (createUser)
    constructor() {
        super(400, `User already exists`, "err-use-02");
    }
}

export class UserDontExists extends ErrorResponse {
    // Fonctions DELETE (deleteUserById)
    constructor() {
        super(404, `User doesn't exist`, "err-use-03");
    }
}