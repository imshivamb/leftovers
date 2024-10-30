import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);

    if(error.name === 'ValidationError') {
        return res.status(400).json({
            message: "Validation error",
            errors: error.errors
        })
    }

    res.status(500).json({
        message: 'Internal Server Error'
    });
}