
import { Request, Response, NextFunction } from "express";

import { authHandler } from "../app/auth.dependencies.js";

import {
    registerAuthSchema,
    loginAuthSchema,
} from "../../app/inputs/auth.input.js";

import { SuccessResponse } from "../../../../core/http/success.response.js";

export class AuthController {

    async register(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const input = registerAuthSchema.parse(req.body);

            const result = await authHandler.register(input);

            res.status(201).json(
                new SuccessResponse(result)
            );

        } catch (error) {
            next(error);
        }
    }

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const input = loginAuthSchema.parse(req.body);

            const result = await authHandler.login(input);

            res.status(200).json(
                new SuccessResponse(result)
            );

        } catch (error) {
            next(error);
        }
    }

}
