import { db } from "../../../core/data-source.js";
import { UserEntity } from "../entities/User.entity.js";
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

    return user
}

export const findByEmail = async (email: string): Promise<UserEntity | null> => {

    const user = await db.getRepository(UserEntity).findOne({
        where: { email },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
        },
    });

    return user
}

export const deleteUser = (id: number): Promise<DeleteResult> => {

    return db.getRepository(UserEntity).delete({ id });

};

export const CreateUser = async (user: {username: string;email: string;password: string;}): Promise<UserEntity> => {

    const newEntity = db.getRepository(UserEntity).create(user);
    const savedUser = await db.getRepository(UserEntity).save(newEntity);

    return savedUser;
};