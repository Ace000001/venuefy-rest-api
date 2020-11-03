const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const venuesController = require('../controllers/venues');
const isAuth = require('../middleware/is-auth');

router.get('/venues', venuesController.getVenues);

router.post('/venue', isAuth, venuesController.createVenue);

router.get('/venue/:venueId', isAuth, venuesController.getVenue);

router.put('/venue/:venueId', isAuth, venuesController.updateVenue);

router.put('/addHistory/:venueId', isAuth, venuesController.addHistory);

router.get('/history', isAuth, venuesController.getHistory);

router.delete('/venue/:venueId', isAuth, venuesController.deleteVenue);

module.exports = router;