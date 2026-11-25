
import { UserService } from "../services/user.service.js";

export class UserHandler {

    constructor(private readonly userService: UserService) {}

    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    async getUserById(id: number) {
        return await this.userService.getUserById(id);
    }

    async createUser(data: {
        username: string;
        email: string;
        password: string;
    }) {
        return await this.userService.createUser(data);
    }

    async updateUser(
        id: number,
        data: {
            username?: string;
            email?: string;
            password?: string;
        }
    ) {
        return await this.userService.updateUser(id, data);
    }

    async deleteUser(id: number) {
        return await this.userService.deleteUserById(id);
    }
}
