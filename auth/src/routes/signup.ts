import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
const router = express.Router();

router.post('/api/users/signup', 
[body('email').isEmail().withMessage('Email Must Be Valid')],
[body('password').trim().isLength({min: 4, max: 20}).withMessage('Password Must Be Between 4 and 20 Characters')],

 (req:Request, res:Response) =>{
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
        }
    const {email, password} = req.body;
    console.log('Creating a user...', email, password);
    res.send({email, password});
    throw new DatabaseConnectionError();
}
);

export {router as signupRouter};