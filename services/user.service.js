const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail.service');
const tokenService = require('../services/token.service');
const UserDto = require('../dtos/user.dto');
const AuthError = require('../exceptions/auth.error');

class UserService {
    async register(email, password) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw AuthError.BadRequest(`User with an email ${email} already registered`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4();
        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});
        if (!user) throw AuthError.BadRequest('Incorrect activation link.');
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw AuthError.BadRequest(`User with email ${email} not found.`);
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw AuthError.BadRequest('Invalid password.');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    
    async refresh(refreshToken) {
        if (!refreshToken) throw AuthError.UnauthorizeError();

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDB) {
            throw AuthError.UnauthorizeError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
}

module.exports = new UserService();