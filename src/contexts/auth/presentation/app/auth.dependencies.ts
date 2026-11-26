
import { TypeOrmAuthRepository } from "../../infra/persistence/typeorm/auth.repository.js";
import { TypeOrmRefreshTokenRepository } from "../../infra/persistence/typeorm/refresh-token.repository.js";

import { JwtService } from "../../infra/security/jwt.service.js";
import { RefreshTokenHasher } from "../../infra/security/refresh-token-hasher.js";

import { RegisterUseCase } from "../../app/usecase/register.usecase.js";
import { LoginUseCase } from "../../app/usecase/login.usecase.js";
import { RefreshTokenUseCase } from "../../app/usecase/refresh-token.usecase.js";

import { AuthService } from "../../app/services/auth.service.js";
import { AuthHandler } from "../../app/handlers/auth.handler.js";

const authRepository = new TypeOrmAuthRepository();
const refreshTokenRepository = new TypeOrmRefreshTokenRepository();

const jwtService = new JwtService();
const refreshTokenHasher = new RefreshTokenHasher();

const registerUseCase = new RegisterUseCase(authRepository);
const loginUseCase = new LoginUseCase(authRepository);

const refreshTokenUseCase = new RefreshTokenUseCase(
    jwtService,
    refreshTokenRepository,
    refreshTokenHasher
);

const authService = new AuthService(
    registerUseCase,
    loginUseCase,
    refreshTokenUseCase,
    jwtService,
    refreshTokenRepository,
    refreshTokenHasher
);

export const authHandler = new AuthHandler(authService);
