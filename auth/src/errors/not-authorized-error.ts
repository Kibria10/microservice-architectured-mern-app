//if the user isnt authorized (didnt login) to a certain page
//then throw this error
//used into require-auth middleware
import { CustomError } from "../errors/custom-error";
export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    constructor() {
        super('Not Authorized');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{ message: 'Not authorized' }];
    }
}