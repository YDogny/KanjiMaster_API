
import { RegisterUseCase } from "../usecase/register.usecase.js";
import { LoginUseCase } from "../usecase/login.usecase.js";

import { RegisterAuthInput, LoginAuthInput } from "../inputs/auth.input.js";
import { IJwtService } from "../interfaces/jwt.service.interface.js";

export class AuthService {

    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly jwtService: IJwtService
    ) {}

    async register(input: RegisterAuthInput) {

        const user = await this.registerUseCase.execute(input);

        const accessToken = this.jwtService.generateAccessToken(user.id);
        const refreshToken = this.jwtService.generateRefreshToken(user.id);

        const { password, ...safeUser } = user;

        return {
            user: safeUser,
            accessToken,
            refreshToken,
        };
    }

    async login(input: LoginAuthInput) {

        const user = await this.loginUseCase.execute(input);

        const accessToken = this.jwtService.generateAccessToken(user.id);
        const refreshToken = this.jwtService.generateRefreshToken(user.id);

        const { password, ...safeUser } = user;

        return {
            user: safeUser,
            accessToken,
            refreshToken,
        };
    }

}
