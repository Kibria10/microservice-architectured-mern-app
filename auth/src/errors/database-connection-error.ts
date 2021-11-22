export class DatabaseConnectionError extends Error {
    reason = 'Error Connecting to Database';
    constructor(){
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

}