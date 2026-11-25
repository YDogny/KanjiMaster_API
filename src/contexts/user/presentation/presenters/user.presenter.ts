import { UserEntity } from "../../infra/persistence/typeorm/User.entity.js";
import { UserDTO } from "../dtos/user.dto.js";

export const presentUser = (user: UserEntity): UserDTO => ({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
});

export const presentUsers = (users: UserEntity[]): UserDTO[] => {
    return users.map(presentUser);
};