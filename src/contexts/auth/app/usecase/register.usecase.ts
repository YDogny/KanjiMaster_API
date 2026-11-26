
import bcrypt from "bcrypt";

import { IAuthRepository } from "../interfaces/auth.repository.interface.js";
import { RegisterAuthInput } from "../inputs/auth.input.js";
import { AuthError } from "../../domain/errors/auth.error.js";

export class RegisterUseCase {

    constructor(
        private readonly authRepository: IAuthRepository
    ) {}

    async execute(input: RegisterAuthInput) {

        const existingUser = await this.authRepository.findByEmail(input.email);

        if (existingUser) {
            throw new AuthError(
                "Cette adresse email est déjà utilisée.",
                409,
                "er-auth-409"
            );
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = await this.authRepository.createUser({
            username: input.username,
            email: input.email,
            password: hashedPassword,
        });

        return user;
    }
}
