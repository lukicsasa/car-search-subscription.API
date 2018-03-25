const mongoose = require('mongoose');

const Schema = mongoose.Schema;
module.exports = mongoose.model('Subscription', new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    year: Number,
    make: String,
    model: String,
    trim: String,
    active: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required'] }
}));



