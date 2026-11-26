
import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "./error.response.js";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { AuthError } from "../../contexts/auth/domain/errors/auth.error.js";

export const apiMiddleware: ErrorRequestHandler = (err, req, res, next) => {

    // Erreurs personnalisées de l'application
    if (err instanceof ErrorResponse) {
        res.status(err.code).json(err.toJSON());
        return;
    }

    // Erreurs métier liées à l'authentification
    if (err instanceof AuthError) {
        const error = new ErrorResponse(
            err.statusCode,
            err.message,
            err.errId
        );

        res.status(error.code).json(error.toJSON());
        return;
    }

    // Erreurs de validation Zod
    if (err instanceof ZodError) {
        const error = new ErrorResponse(
            400,
            "Validation Zod failed",
            "er-Zod-400",
            {
                fields: err.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            }
        );

        res.status(error.code).json(error.toJSON());
        return;
    }

    // JWT expiré
    if (err instanceof jwt.TokenExpiredError) {
        const error = new ErrorResponse(
            401,
            "Token expiré.",
            "er-jwt-401-expired"
        );

        res.status(error.code).json(error.toJSON());
        return;
    }

    // JWT invalide ou pas encore utilisable
    if (
        err instanceof jwt.JsonWebTokenError ||
        err instanceof jwt.NotBeforeError
    ) {
        const error = new ErrorResponse(
            401,
            "Token invalide.",
            "er-jwt-401-invalid"
        );

        res.status(error.code).json(error.toJSON());
        return;
    }
}