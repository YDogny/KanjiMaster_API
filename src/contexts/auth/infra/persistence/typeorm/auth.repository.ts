
import { db } from "../../../../../core/config/data-source.js";
import { UserEntity } from "../../../../user/infra/persistence/typeorm/User.entity.js";
import { IAuthRepository } from "../../../app/interfaces/auth.repository.interface.js";

export class TypeOrmAuthRepository implements IAuthRepository {

    async findByEmail(email: string): Promise<UserEntity | null> {

        return await db.getRepository(UserEntity).findOne({
            where: { email },
        });

    }

    async createUser(user: {
        username: string;
        email: string;
        password: string;
    }): Promise<UserEntity> {

        const newEntity = db.getRepository(UserEntity).create(user);

        return await db.getRepository(UserEntity).save(newEntity);

    }

}
