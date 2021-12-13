import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox1ba77257c90e414d9bec6231e1b49472.mailgun.org';
const api_key: string = '3587925de9e0d95b46bbd50fcecdd7a8-7005f37e-afb4d07c';
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

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

    const { email, password, name, dob, role, department, address } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    // const userToken = jwt.sign({ email, password }, process.env.JWT_KEY!, { expiresIn: '1d' });
    // const data = {
    //   from: 'ShurjoMukhi ERP <noreply@hello.com>',
    //   to: email,
    //   subject: 'Account Activation Link [ShurjoERP]',
    //   html: `<h2>Please click on the given link to activate your account</h2>
    //          <p>https://ticketing.dev/authentication/activate/${userToken}</p>`
    // };
    // mg.messages().send(data, function (error: Error, body: Body) {
    //   if (error) {
    //     throw new BadRequestError(error.message);
    //   }
    //   console.log(body);
    //   return res.json({ message: 'An email has been sent to your account. Use the token key to activate your account.' });
    // });

    const user = User.build({ email, password, name, role, department });
    console.log(user);
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
