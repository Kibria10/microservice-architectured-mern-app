
import { CustomError } from "./custom-error";
export class AlreadySignedInError extends CustomError {
    statusCode = 401;
    constructor() {
        super('Not Authorized');
        Object.setPrototypeOf(this, AlreadySignedInError.prototype);
    }
    serializeErrors() {
        return [{ message: 'You have already signed in.' }];
    }
}