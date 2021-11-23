import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    StatusCode = 400;
    constructor(public errors: ValidationError[]){
        super();
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map(err => {
            return {message: err.msg, field: err.param}
        })
    }
} 