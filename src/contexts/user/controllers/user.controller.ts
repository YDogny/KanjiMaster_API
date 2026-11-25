importw { SuccessResponse } from "../../../core/http/success.response.js";
import * as userService from "../services/user.service.js";
import { createUserSchema, updateUserSchema } from "../types/zod/user.zod.js";

export const getUsers = async (req: any, res: any) => {
    const users = await userService.getAllUsers();
    res.status(201).send(new SuccessResponse(users))
}

export const getUserById = async (req: any, res: any) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUserById(userId);
    res.status(201).send(new SuccessResponse(user));
}

export const deleteUser = async (req: any, res: any) => {
    const userId = parseInt(req.params.id, 10);
    const response = await userService.deleteUserById(userId);
    res.status(201).send(new SuccessResponse(response));
}

export const createUser = async (req: any, res: any) => {
    const data = createUserSchema.parse(req.body);
    const newUser = await userService.CreateUser(data);
    res.status(201).send(new SuccessResponse(newUser));
};

export const updateUser = async (req: any, res: any) => {
    const data = updateUserSchema.parse(req.body);
    const changedUser = await userService.UpdateUser(Number(req.params.id), data);
    res.status(200).send(new SuccessResponse(changedUser));
};