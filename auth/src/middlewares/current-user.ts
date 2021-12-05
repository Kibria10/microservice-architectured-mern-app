import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

//creating UserPayload interface for req.currentUser
interface UserPayload {
    id: string,
    email: string
}

//modifying an existing interface/Augmenting type definitions
declare global {
    namespace Express //inside the express project
    {
        interface Request //find the interface named request
        {
            currentUser?: UserPayload;
            //add an extra property to request named currentUser
            //so that TS can find it
            // the ? is for that currentUser may or may not be defined as user can or can not be logged in.
        }
    }
}
//**************************************************************//
//a middleware to tell other services the state of our current user
//who is this user and if not logged in then null.

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload;
    } catch (err) {

    }
    next();
}