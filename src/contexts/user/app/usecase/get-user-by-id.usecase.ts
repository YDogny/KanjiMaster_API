import { UserEntity } from "../../infra/persistence/typeorm/User.entity.js";
import { IUserRepository } from "../interfaces/user.repository.interface.js";
import * as UserError from "../../domain/errors/user.error.js";

export class GetUserByIdUseCase {

    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new UserError.UserNotFound();
        }

        return user;
    }
}