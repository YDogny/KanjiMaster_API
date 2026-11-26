
import { IJwtService } from "../interfaces/jwt.service.interface.js";
import { IRefreshTokenRepository } from "../interfaces/refresh-token.repository.interface.js";
import { RefreshTokenHasher } from "../../infra/security/refresh-token-hasher.js";
import { AuthError } from "../../domain/errors/auth.error.js";

export class RefreshTokenUseCase {

    constructor(
        private readonly jwtService: IJwtService,
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private readonly refreshTokenHasher: RefreshTokenHasher
    ) {}

    async execute(refreshToken: string) {

        const payload = this.jwtService.verifyRefreshToken(refreshToken);

        const tokenHash = this.refreshTokenHasher.hash(refreshToken);

        const storedToken = await this.refreshTokenRepository.findByTokenHash(tokenHash);

        if (!storedToken) {
            throw new AuthError("Refresh Token invalide ou révoqué.");
        }

        if (storedToken.revokedAt !== null) {
            throw new AuthError("Refresh Token invalide ou révoqué.");
        }

        if (storedToken.expiresAt.getTime() <= Date.now()) {
            throw new AuthError("Refresh Token expiré.");
        }

        await this.refreshTokenRepository.revoke(tokenHash);

        const accessToken = this.jwtService.generateAccessToken(payload.userId);
        const newRefreshToken = this.jwtService.generateRefreshToken(payload.userId);

        const newTokenHash = this.refreshTokenHasher.hash(newRefreshToken);
        const expiresAt = this.jwtService.getRefreshTokenExpiration(newRefreshToken);

        await this.refreshTokenRepository.save({
            userId: payload.userId,
            tokenHash: newTokenHash,
            expiresAt,
        });

        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
}
