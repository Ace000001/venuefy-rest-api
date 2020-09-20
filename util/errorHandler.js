const { validationResult } = require('express-validator');

exports.validationErrors = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
}

exports.serverError = (err) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
}

exports.notFound = (message) => {
    const errorMessage = message || 'Could not find the requested resource.';
    const error = new Error(errorMessage);
    error.statusCode = 404;
    throw error;
}

exports.notAuthenticated = (message) => {
    const errorMessage = message || 'Resource is not authenticated.';
    const error = new Error(errorMessage);
    error.statusCode = 401;
    throw error;
}