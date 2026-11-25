import { SuccessResponse } from "../../../../core/http/success.response.js";

import { UserService } from "../../app/services/user.service.js";
import { TypeOrmUserRepository } from "../../infra/persistence/typeorm/user.repository.js";

import { createUserSchema, updateUserSchema } from "../../app/inputs/user.input.js";
import { presentUser, presentUsers } from "../presenters/user.presenter.js";

// Injection du repository dans le service
const userRepository = new TypeOrmUserRepository();
const userService = new UserService(userRepository);

export const getUsers = async (req: any, res: any) => {
    const users = await userService.getAllUsers();

    res.status(200).send(new SuccessResponse(presentUsers(users)));
};

export const getUserById = async (req: any, res: any) => {
    const userId = parseInt(req.params.id, 10);

    const user = await userService.getUserById(userId);

    res.status(200).send(new SuccessResponse(presentUser(user)));
};

export const deleteUser = async (req: any, res: any) => {
    const userId = parseInt(req.params.id, 10);

    const response = await userService.deleteUserById(userId);

    res.status(200).send(new SuccessResponse(response));
};

export const createUser = async (req: any, res: any) => {
    const data = createUserSchema.parse(req.body);

    const newUser = await userService.createUser(data);

    res.status(201).send(new SuccessResponse(presentUser(newUser)));
};

export const updateUser = async (req: any, res: any) => {
    const data = updateUserSchema.parse(req.body);

    const changedUser = await userService.updateUser(
        Number(req.params.id),
        data
    );

    res.status(200).send(new SuccessResponse(presentUser(changedUser)));
};