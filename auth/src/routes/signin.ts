import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
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
    (req: Request, res: Response) => {
        res.status(201);
    }
);

router.get('/api/users/signin', (req, res) => {
    res.send('Hello Peter.');
});

export { router as signinRouter };