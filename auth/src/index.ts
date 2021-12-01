import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth'
            // , {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     // useCreateIndex: true
            // } as ConnectOptions

            //useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
            // Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology,
            // and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
        );
        console.log('Connected to MongoDb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!');
    });
};

start();
