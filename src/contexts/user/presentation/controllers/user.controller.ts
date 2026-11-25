
import { SuccessResponse } from "../../../../core/http/success.response.js";

import { userHandler } from "../app/user.dependencies.js";

import { createUserSchema, updateUserSchema } from "../../app/inputs/user.input.js";
import { presentUser, presentUsers } from "../presenters/user.presenter.js";

export const getUsers = async (req: any, res: any) => {
    const users = await userHandler.getAllUsers();
    res.status(200).send(new SuccessResponse(presentUsers(users)));
};

export const getUserById = async (req: any, res: any) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userHandler.getUserById(userId);
    res.status(200).send(new SuccessResponse(presentUser(user)));
};

export const deleteUser = async (req: any, res: any) => {
    const userId = parseInt(req.params.id, 10);
    const response = await userHandler.deleteUser(userId);
    res.status(200).send(new SuccessResponse(response));
};

export const createUser = async (req: any, res: any) => {
    const data = createUserSchema.parse(req.body);
    const newUser = await userHandler.createUser(data);
    res.status(201).send(new SuccessResponse(presentUser(newUser)));
};

export const updateUser = async (req: any, res: any) => {
    const data = updateUserSchema.parse(req.body);
    const changedUser = await userHandler.updateUser(Number(req.params.id), data);
    res.status(200).send(new SuccessResponse(presentUser(changedUser)));
};
