
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

}
