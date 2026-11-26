
import { UserEntity } from "../../../user/infra/persistence/typeorm/User.entity.js";

export interface IAuthRepository {

    findByEmail(email: string): Promise<UserEntity | null>;

    createUser(user: {
        username: string;
        email: string;
        password: string;
    }): Promise<UserEntity>;

}
