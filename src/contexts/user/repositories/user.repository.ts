import { db } from "../../../config/data-source";
import { UserEntity } from "../entities/User.entity";
import { DeleteResult } from "typeorm";

export const getAll = async (): Promise<UserEntity[]> => {
    const users: UserEntity[] | [] = await db.getRepository(UserEntity).find({
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
        },
    });
    if (!users) {
        throw new Error("Users not found");
    }

    return users
}

export const findById = (id: number): Promise<UserEntity | null> => {
    const user = db.getRepository(UserEntity).findOne({
        where: { id },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }

    return user
}

export const deleteUser = (id: number): Promise<DeleteResult> => {

    return db.getRepository(UserEntity).delete({ id });

};