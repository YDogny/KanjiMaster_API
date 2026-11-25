import { db } from "../../../../../core/config/data-source.js";
import { UserEntity } from "./User.entity.js";
import { IUserRepository } from "../../../app/interfaces/user.repository.interface.js";

export class TypeOrmUserRepository implements IUserRepository {

    async getAll(): Promise<UserEntity[]> {
        return await db.getRepository(UserEntity).find({
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            },
        });
    }

    async findById(id: number): Promise<UserEntity | null> {
        return await db.getRepository(UserEntity).findOne({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            },
        });
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await db.getRepository(UserEntity).findOne({
            where: { email },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            },
        });
    }

    async deleteUser(id: number): Promise<boolean> {
        const result = await db.getRepository(UserEntity).delete({ id });

        return (result.affected ?? 0) > 0;
    }

    async createUser(user: {
        username: string;
        email: string;
        password: string;
    }): Promise<UserEntity> {
        const newEntity = db.getRepository(UserEntity).create(user);

        return await db.getRepository(UserEntity).save(newEntity);
    }

    async updateUser(
        id: number,
        user: Partial<Pick<UserEntity, "username" | "email" | "password">>
    ): Promise<UserEntity | null> {
        const result = await db.getRepository(UserEntity).update({ id }, user);

        if (result.affected === 0) {
            return null;
        }

        return await db.getRepository(UserEntity).findOne({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            },
        });
    }
}