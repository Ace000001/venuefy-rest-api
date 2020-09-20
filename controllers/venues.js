const fs = require('fs');
const path = require('path');

const Venue = require('../models/venue');
const User = require('../models/user');
const mapper = require('../util/mapper');
const errorHandler = require('../util/errorHandler');

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
}

exports.getVenues = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = req.query.perPage || 10;
        let totalItems = await Venue.find().countDocuments();
        const venues = await Venue.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage);
        res.status(200).json({ message: 'Fetch venues successfully.', venues: venues, totalItems: totalItems });
    }
    catch (err) {
        errorHandler.serverError(err);
        next(err);
    }
};

exports.createVenue = async (req, res, next) => {
    try {
        errorHandler.validationErrors(req);
        let venue = new Venue();
        let creator;
        mapper.mapVenue(req, venue);
        const result = await venue.save();
        const user = await User.findById(req.userId);
        creator = user;
        user.venues.push(venue);
        const userResult = await user.save();
        res.status(201).json({
            message: "venue added successfully!",
            venue: venue,
            creator: { _id: creator._id, name: creator.name }
        });
    }
    catch (err) {
        errorHandler.serverError(err);
        next(err);
    };
};

exports.getVenue = async (req, res, next) => {
    const venueId = req.params.venueId;
    try {
        const venue = await Venue.findById(venueId);
        if (!venue) {
            errorHandler.notFound('Could not find venue.');
        }
        res.status(200).json({ message: 'Venue fetched.', venue: venue });
    }
    catch (err) {
        errorHandler.serverError(err);
        next(err);
    };
};

exports.updateVenue = async (req, res, next) => {
    try {
        errorHandler.validationErrors(req);
        const venueId = req.params.venueId;
        let venue = await Venue.findById(venueId);
        if (!venue) {
            errorHandler.notFound('Could not find venue.');
        }
        const oldImageUrl = venue.imageUrl;
        mapper.mapVenue(req, venue);
        //image cleanup
        if (venue.imageUrl !== oldImageUrl) {
            clearImage(oldImageUrl);
        }
        const updatedVenue = await venue.save();
        res.status(200).json({ message: 'Venue updated.', venue: updatedVenue });
    }
    catch (err) {
        errorHandler.serverError(err);
        next(err);
    };
};

exports.deleteVenue = async (req, res, next) => {
    const venueId = req.params.venueId;
    try {
        const venue = await Venue.findById(venueId);
        if (!venue) {
            errorHandler.notFound('Could not find venue.');
        }
        //checked logged in user
        clearImage(venue.imageUrl);
        const result = await Venue.findByIdAndRemove(venueId);
        const user = User.findById(req.userId);
        user.venues.pull(venueId);
        const userResult = user.save();
        res.status(200).json({ message: 'Venue deleted.' });
    }
    catch (err) {
        errorHandler.serverError(err);
        next(err);
    };
};
