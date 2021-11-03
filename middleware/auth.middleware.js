const AuthError = require("../exceptions/auth.error");
const tokenService = require("../services/token.service");

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(AuthError.UnauthorizeError());
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(AuthError.UnauthorizeError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(AuthError.UnauthorizeError());
        }

        req.user = userData;
        next();
    } catch (error) {
        return next(AuthError.UnauthorizeError())
    }
}