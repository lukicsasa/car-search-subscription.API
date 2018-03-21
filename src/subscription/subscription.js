const mongoose = require('mongoose');

const Schema = mongoose.Schema;
module.exports = mongoose.model('Subscription', new Schema({
    name: String,
    year: Number,
    make: String,
    model: String,
    trim: String,
    active: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}));



