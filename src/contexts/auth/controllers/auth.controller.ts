/*import * as authServices from "../services/auth.service.ts";
//import { createUserSchema } from "../types/zod/user.zod.ts";
import { AuthEntity } from "../entities/auth.entity.ts";


export const login = (req, res) => {
    const { email, password } = req.body;

    const user: AuthEntity = authServices.ValidateAuth(email, password);

    if (!user) {
        res.status(401).send({ message: "Invalid email or password" });
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(user);
};*/