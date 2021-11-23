export class DatabaseConnectionError extends Error {
    reason = 'Error Connecting to Database';
    StatusCode = 500;
    constructor(){
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return[
            {message: this.message}
        ]
    }
}