import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      //   console.log('Email in use');
      //   return res.send({});
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();
    //Generate JWT

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email,
      // password: user.password
    }, process.env.JWT_KEY!);

    //store jwt on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);


router.get('/api/users/signup', (req, res) => {
  res.send('Signup page');
});
export { router as signupRouter };
