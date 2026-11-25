import { UserEntity } from "../../infra/persistence/typeorm/User.entity.js";
import { IUserRepository } from "../interfaces/user.repository.interface.js";
import * as UserError from "../../domain/errors/user.error.js";

import bcrypt from "bcrypt";

interface UpdateUserInput {
    username?: string;
    email?: string;
    password?: string;
}

export class UpdateUserUseCase {

    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: number, userToUpdate: UpdateUserInput): Promise<UserEntity> {

        const existingUser = await this.userRepository.findById(id);

        if (!existingUser) {
            throw new UserError.UserNotFound();
        }

        if (userToUpdate.email && userToUpdate.email !== existingUser.email) {
            const emailUser = await this.userRepository.findByEmail(userToUpdate.email);

            if (emailUser && emailUser.id !== id) {
                throw new UserError.UserAlreadyExists();
            }
        }

        const updatedData = { ...userToUpdate };

        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }

        const updatedUser = await this.userRepository.updateUser(id, updatedData);

        if (!updatedUser) {
            throw new UserError.UserNotFound();
        }

        return updatedUser;
    }
}