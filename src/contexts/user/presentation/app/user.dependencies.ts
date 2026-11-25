
import { UserService } from "../../app/services/user.service.js";
import { UserHandler } from "../../app/handlers/user.handler.js";
import { TypeOrmUserRepository } from "../../infra/persistence/typeorm/user.repository.js";

const userRepository = new TypeOrmUserRepository();
const userService = new UserService(userRepository);

export const userHandler = new UserHandler(userService);
