const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const venuesController = require('../controllers/venues')

router.get('/venues', venuesController.getVenues);

router.post('/venue', [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('title')
        .trim()
        .isLength({ min: 5 }),
], venuesController.createVenue);

module.exports = router;