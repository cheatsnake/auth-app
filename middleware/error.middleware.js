const AuthError = require('../exceptions/auth.error');

module.exports = function(err, req, res, next) {
    console.log(err);
    if (err instanceof AuthError) {
        return res.status(err.status).send({message: err.message, errors: err.errors});
    }
    return res.status(500).send({message: 'Ops... Server is not responding.'})
}