const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth');

const User = require('../models/user');

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .custom((value, {req}) => {
            return User.findOne({email: value}).then(userDoc => {
                if(userDoc){
                    return Promise.reject('E-mail address already exists!')
                }
            })
        })
        // .customSanitizer(value => {
        //     return value.toLowerCase();
        // }),
        .normalizeEmail({ gmail_remove_dots: false }),
    body('password')
        .trim()
        .isLength({min: 5}),
    body('name')
        .trim()
        .not()
        .isEmpty()    
], authController.signup);

router.post('/signin', authController.signin);

router.post('/getuser', authController.getUser);

module.exports = router;