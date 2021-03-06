import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@kibria10/common';
import { User } from '../models/user';
import { BadRequestError } from '@kibria10/common';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { currentUser } from '@kibria10/common';
import { AlreadySignedInError } from '@kibria10/common';
const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email')
            .isEmail()
            .toLowerCase()
            .contains('@shurjomukhi', { ignoreCase: true })
            .withMessage('Email Must Be Valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password Must Be Supplied')
    ],
    validateRequest,
    currentUser,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (req.currentUser) {
            throw new AlreadySignedInError();
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid Credentials');
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credentials');
        }
        const role = await existingUser.role;
        console.log("ROLE:" + role);
        // if (!existingUser.verified) {
        //     throw new BadRequestError('Email Not Verified');
        // }

        //Generate JWT

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
            // password: existingUser.password
        }, process.env.JWT_KEY2!);

        //store jwt on session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(existingUser);

    }
);

router.get('/api/users/signin', (req, res) => {
    res.send('Hello Peter.');
});

export { router as signinRouter };