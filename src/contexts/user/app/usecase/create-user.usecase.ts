import { UserEntity } from "../../infra/persistence/typeorm/User.entity.js";
import { IUserRepository } from "../interfaces/user.repository.interface.js";
import * as UserError from "../../domain/errors/user.error.js";

import bcrypt from "bcrypt";

import { eventEmitter } from "../../../../core/bus/event.emitter.js";
import { EVENTS } from "../../../../core/bus/event.name.js";

interface CreateUserInput {
    username: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {

    constructor(private readonly userRepository: IUserRepository) {}

    async execute(userToCreate: CreateUserInput): Promise<UserEntity> {

        const existingUser = await this.userRepository.findByEmail(userToCreate.email);

        if (existingUser) {
            throw new UserError.UserAlreadyExists();
        }

        const hashedPassword = await bcrypt.hash(userToCreate.password, 10);

        const createdUser = await this.userRepository.createUser({
            ...userToCreate,
            password: hashedPassword,
        });

        eventEmitter.emit(EVENTS.USER_CREATED, createdUser.email);

        return createdUser;
    }
}