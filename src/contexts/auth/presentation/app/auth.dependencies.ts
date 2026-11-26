
import { TypeOrmAuthRepository } from "../../infra/persistence/typeorm/auth.repository.js";
import { JwtService } from "../../infra/security/jwt.service.js";

import { RegisterUseCase } from "../../app/usecase/register.usecase.js";
import { LoginUseCase } from "../../app/usecase/login.usecase.js";

import { AuthService } from "../../app/services/auth.service.js";
import { AuthHandler } from "../../app/handlers/auth.handler.js";

// Repository
const authRepository = new TypeOrmAuthRepository();

// JWT
const jwtService = new JwtService();

// Use Cases
const registerUseCase = new RegisterUseCase(authRepository);
const loginUseCase = new LoginUseCase(authRepository);

// Service
const authService = new AuthService(
    registerUseCase,
    loginUseCase,
    jwtService
);

// Handler
export const authHandler = new AuthHandler(authService);
