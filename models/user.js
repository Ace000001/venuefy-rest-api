const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    venues: [{
        type: Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    }]

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);