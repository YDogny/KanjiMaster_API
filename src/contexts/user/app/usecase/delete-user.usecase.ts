import { IUserRepository } from "../interfaces/user.repository.interface.js";
import * as UserError from "../../domain/errors/user.error.js";

export class DeleteUserUseCase {

    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: number): Promise<string> {
        const deleted = await this.userRepository.deleteUser(id);

        if (!deleted) {
            throw new UserError.UserDontExists();
        }

        return "Ok";
    }
}