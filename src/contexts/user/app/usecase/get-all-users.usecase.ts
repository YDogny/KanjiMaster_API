import { UserEntity } from "../../infra/persistence/typeorm/User.entity.js";
import { IUserRepository } from "../interfaces/user.repository.interface.js";

export class GetAllUsersUseCase {

    constructor(private readonly userRepository: IUserRepository) {}

    async execute(): Promise<UserEntity[]> {
        return await this.userRepository.getAll();
    }
}