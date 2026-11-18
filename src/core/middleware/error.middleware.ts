import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "../http/error.response.js";
import { ZodError } from "zod";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    //erreur personalisé les notres
    if (err instanceof ErrorResponse) {
        res.status(err.code).json(err.toJSON());
    }
    
    //erreur zod ou classe validator si pas bon renvoi erreur
    if (err instanceof ZodError) {
        const error = new ErrorResponse(400, "Validation Zod failed", "er-Zod-400", {
            fields: err.issues.map(issue => ({
                field: issue.path.join(","), 
                message: issue.message
            }))
        });
        res.status(error.code).json(error.toJSON());
    }

    //erreur classe inconnue au cas ou
    const error = new ErrorResponse(500 ,"Internal Server Error", "er-01-001-01");
    res.status(error.code).json(error.toJSON());
};