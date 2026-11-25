import { UserEntity } from "../../infra/persistence/typeorm/User.entity.js";

export const presentUser = (user: UserEntity) => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
    };
};

export const presentUsers = (users: UserEntity[]) => {
    return users.map(presentUser);
};