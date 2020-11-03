const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const veneuSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imageLibrary: [
        {
            title: { type: String, required: true },
            images: [
                { type: String, required: true }
            ],
        }
    ],
    facilities: [
        {
            name: { type: String, required: true },
            type: { type: String, required: true },
            text: { type: String, required: true },
        }
    ],
    pricePerHead: {
        type: Number,
        required: true
    },
    minOcc: {
        type: Number,
        required: true
    },
    maxOcc: {
        type: Number,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    activeUsers:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }],

}, { timestamps: true });

module.exports = mongoose.model('Venue', veneuSchema);