const jwt = require('jsonwebtoken');
const settings = require('../util/settings');
const errorHandler = require('../util/errorHandler');

module.exports = (req, res, next) => {
    const authHeader =  req.get('Authorization');
    if(!authHeader){
        errorHandler.notAuthenticated('Not authenticated!');
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, settings.getAppSecret())
    }catch(err){
        errorHandler.serverError(err);
        throw err;
    }
    if(!decodedToken){
        errorHandler.notAuthenticated('Not authenticated!');
    }
    req.userId = decodedToken.userId;
    next();
}