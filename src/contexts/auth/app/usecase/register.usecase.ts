
import bcrypt from "bcrypt";

import { IAuthRepository } from "../interfaces/auth.repository.interface.js";
import { RegisterAuthInput } from "../inputs/auth.input.js";

export class RegisterUseCase {

    constructor(
        private readonly authRepository: IAuthRepository
    ) {}

    async execute(input: RegisterAuthInput) {

        const existingUser = await this.authRepository.findByEmail(input.email);

        if (existingUser) {
            throw new Error("Cette adresse email est déjà utilisée.");
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
