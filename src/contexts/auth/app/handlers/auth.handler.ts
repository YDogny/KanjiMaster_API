
import { AuthService } from "../services/auth.service.js";
import { RegisterAuthInput, LoginAuthInput } from "../inputs/auth.input.js";

export class AuthHandler {

    constructor(
        private readonly authService: AuthService
    ) {}

    async register(input: RegisterAuthInput) {
        return await this.authService.register(input);
    }

    async login(input: LoginAuthInput) {
        return await this.authService.login(input);
    }

    async refresh(refreshToken: string) {
        return await this.authService.refresh(refreshToken);
    }

    async logout(refreshToken: string) {
        return await this.authService.logout(refreshToken);
    }
}
