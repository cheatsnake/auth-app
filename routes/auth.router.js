const Router = require('express');
const userController = require('../controllers/user.controller');
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

const authRouter = new Router();

authRouter.post('/register', 
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 20}),
    userController.register);
authRouter.post('/login', userController.login);
authRouter.post('/logout', userController.logout);
authRouter.get('/activate/:link', userController.activate);
authRouter.get('/refresh', userController.refresh);
authRouter.get('/data', authMiddleware, userController.getData);

module.exports = authRouter;