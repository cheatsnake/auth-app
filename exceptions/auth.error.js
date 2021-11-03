module.exports = class AuthError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizeError() {
        return new AuthError(401, 'User is not logged in');
    }

    static BadRequest(message, errors = []) {
        return new AuthError(400, message, errors);
    }
}