import * as userService from "../services/user.service";

/*
export const createUser = (req: Request, res: Response) => {
    const newUser: UserEntity = userService.CreateUser(req.body);
    res.status(201).send(newUser);
};*/

export const getUsers = async (req: any, res: any) => {
    const users = await userService.getAllUsers();
    if (users === null) {
        res.status(404).send({ message: "No users found" });
    } else {
        res.status(200).send(users);
    }
}

export const getUserById = async (req: any, res: any) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUserById(userId);
    if (user === null) {
        res.status(404).send({ message: "User not found" });
    } else {
        res.status(200).send(user);
    }
}

export const deleteUser = async (req: any, res: any) => {
    const userId = parseInt(req.params.id, 10);
    const response = await userService.deleteUserById(userId);
    if (response !== "Ok") {
        res.status(404).send({ message: "This user does not exist" });
    } else {
        res.status(200).send({ message: "Success, user deleted" });
    }
}