import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next:NextFunction) => {
    console.log('Something Went Wrong', err);
    res.status(400).send({
        message: err.message
    });
};