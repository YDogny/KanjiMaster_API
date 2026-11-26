
import bcrypt from "bcrypt";

import { IAuthRepository } from "../interfaces/auth.repository.interface.js";
import { LoginAuthInput } from "../inputs/auth.input.js";

export class LoginUseCase {

    constructor(
        private readonly authRepository: IAuthRepository
    ) {}

    async execute(input: LoginAuthInput) {

        const user = await this.authRepository.findByEmail(input.email);

        if (!user) {
            throw new Error("Email ou mot de passe incorrect.");
        }

        const passwordIsValid = await bcrypt.compare(
            input.password,
            user.password
        );

        if (!passwordIsValid) {
            throw new Error("Email ou mot de passe incorrect.");
        }

        return user;
    }
}
