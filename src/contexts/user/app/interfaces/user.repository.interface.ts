import { UserEntity } from "../../infra/persistence/typeorm/User.entity.js";

export interface IUserRepository {
    getAll(): Promise<UserEntity[]>;

    findById(id: number): Promise<UserEntity | null>;

    findByEmail(email: string): Promise<UserEntity | null>;

    deleteUser(id: number): Promise<boolean>;

    createUser(user: {
        username: string;
        email: string;
        password: string;
    }): Promise<UserEntity>;

    updateUser(
        id: number,
        user: Partial<Pick<UserEntity, "username" | "email" | "password">>
    ): Promise<UserEntity | null>;
}