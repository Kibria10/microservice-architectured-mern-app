import express from 'express';
import 'express-async-errors';
import mongoose, { ConnectOptions } from "mongoose";
import cookieSession from 'cookie-session';

// import mongoose from 'mongoose';
import { User } from './models/user';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
const app = express();
app.use(json());
app.set('trust proxy', true);
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

//async working here without the next keyword and we are able to throw error as usual
//because of the express-async-errors package we have imported.
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    try {
        //
        //mongodb://localhost/auth
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        } as ConnectOptions);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('Listening to port 3000!!!!');
    });
};

start();