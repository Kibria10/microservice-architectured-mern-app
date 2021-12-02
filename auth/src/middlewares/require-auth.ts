//the goal of this middleware is to reject any request if the user isnt signed in
//if req.currentUser isnt defined, that means user isnt logged in
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
};