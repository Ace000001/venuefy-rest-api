const User = require('../models/user');
const mapper = require('../util/mapper');
const errorHandler = require('../util/errorHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const settings = require('../util/settings');

exports.signup = async (req, res, next) => {
    try {
        errorHandler.validationErrors(req);
        let user = new User();
        mapper.mapUser(req, user);
        user.password = await bcrypt.hash(user.password, 12);
        const result = await user.save();
        res.status(200).json({ message: 'User created!', userId: result._id });
    } catch (err) {
        errorHandler.serverError(err);
        next(err);
    }
}

exports.signin = async (req, res, next) => {
    try {
        // errorHandler.validationErrors(req);
        const email = req.body.email;
        const password = req.body.password;
        let loadedUser;
        const user = await User.findOne({ email: email });
        if (!user) {
            errorHandler.notAuthenticated('Email does not exist.');
        }
        loadedUser = user;
        const isIdentical = await bcrypt.compare(password, user.password);
        if (!isIdentical) {
            errorHandler.notAuthenticated('Password is incorrect.');
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        }, settings.getAppSecret()/*, { expiresIn: '1h' }*/);
        res.status(200).json({ 
            token: token, 
            userId: loadedUser._id.toString(),
            name: loadedUser.name,
            email: loadedUser.email,
            role: loadedUser.role,
        });
    } catch (err) {
        errorHandler.serverError(err);
        next(err);
    }
}