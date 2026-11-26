
import { RegisterUseCase } from "../usecase/register.usecase.js";
import { LoginUseCase } from "../usecase/login.usecase.js";
import { RefreshTokenUseCase } from "../usecase/refresh-token.usecase.js";

import { RegisterAuthInput, LoginAuthInput } from "../inputs/auth.input.js";
import { IJwtService } from "../interfaces/jwt.service.interface.js";
import { IRefreshTokenRepository } from "../interfaces/refresh-token.repository.interface.js";
import { RefreshTokenHasher } from "../../infra/security/refresh-token-hasher.js";

export class AuthService {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly jwtService: IJwtService,
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private readonly refreshTokenHasher: RefreshTokenHasher
    ) {}

    private async createTokens(userId: number) {
        const accessToken = this.jwtService.generateAccessToken(userId);
        const refreshToken = this.jwtService.generateRefreshToken(userId);

        await this.refreshTokenRepository.save({
            userId,
            tokenHash: this.refreshTokenHasher.hash(refreshToken),
            expiresAt: this.jwtService.getRefreshTokenExpiration(refreshToken),
        });

        return { accessToken, refreshToken };
    }

    async register(input: RegisterAuthInput) {
        const user = await this.registerUseCase.execute(input);
        const tokens = await this.createTokens(user.id);
        const { password, ...safeUser } = user;

        return { user: safeUser, ...tokens };
    }

    async login(input: LoginAuthInput) {
        const user = await this.loginUseCase.execute(input);
        const tokens = await this.createTokens(user.id);
        const { password, ...safeUser } = user;

        return { user: safeUser, ...tokens };
    }

    async refresh(refreshToken: string) {
        return await this.refreshTokenUseCase.execute(refreshToken);
    }

    async logout(refreshToken: string): Promise<void> {
        // Vérifier le token avant de le révoquer
        this.jwtService.verifyRefreshToken(refreshToken);

        const tokenHash = this.refreshTokenHasher.hash(refreshToken);
        await this.refreshTokenRepository.revoke(tokenHash);
    }
}
