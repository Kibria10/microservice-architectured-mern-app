import mongoose, { ConnectOptions } from 'mongoose';
import { app } from './app';
const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined(/signup)');
    }
    if (!process.env.JWT_KEY2) {
        throw new Error('JWT_KEY2 must be defined(/signin)');
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
