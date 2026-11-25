import { IUserRepository } from "../interfaces/user.repository.interface.js";

import { GetAllUsersUseCase } from "../usecase/get-all-users.usecase.js";
import { GetUserByIdUseCase } from "../usecase/get-user-by-id.usecase.js";
import { CreateUserUseCase } from "../usecase/create-user.usecase.js";
import { UpdateUserUseCase } from "../usecase/update-user.usecase.js";
import { DeleteUserUseCase } from "../usecase/delete-user.usecase.js";

export class UserService {

    private readonly getAllUsersUseCase: GetAllUsersUseCase;
    private readonly getUserByIdUseCase: GetUserByIdUseCase;
    private readonly createUserUseCase: CreateUserUseCase;
    private readonly updateUserUseCase: UpdateUserUseCase;
    private readonly deleteUserUseCase: DeleteUserUseCase;

    constructor(userRepository: IUserRepository) {
        this.getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
        this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
        this.createUserUseCase = new CreateUserUseCase(userRepository);
        this.updateUserUseCase = new UpdateUserUseCase(userRepository);
        this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
    }

    async getAllUsers() {
        return await this.getAllUsersUseCase.execute();
    }

    async getUserById(id: number) {
        return await this.getUserByIdUseCase.execute(id);
    }

    async createUser(userToCreate: {
        username: string;
        email: string;
        password: string;
    }) {
        return await this.createUserUseCase.execute(userToCreate);
    }

    async updateUser(
        id: number,
        userToUpdate: {
            username?: string;
            email?: string;
            password?: string;
        }
    ) {
        return await this.updateUserUseCase.execute(id, userToUpdate);
    }

    async deleteUserById(id: number) {
        return await this.deleteUserUseCase.execute(id);
    }
}