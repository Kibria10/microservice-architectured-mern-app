import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
import { alreadySignedIn } from '../middlewares/already-signed-in';
const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email Must Be Valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password Must Be Supplied')
    ],
    validateRequest,
    currentUser,
    alreadySignedIn,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid Credentials');
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credentials');
        }

        //Generate JWT

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
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