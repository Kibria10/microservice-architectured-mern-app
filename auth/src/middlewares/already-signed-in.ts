import { Request, Response, NextFunction } from 'express';
import { AlreadySignedInError } from '../errors/already-signed-in';
export const alreadySignedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser) {
        throw new AlreadySignedInError();
    }
    next();
};