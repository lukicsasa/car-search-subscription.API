const mongoose = require('mongoose');

const Schema = mongoose.Schema;
module.exports = mongoose.model('User', new Schema({
    username: { type: String, required: [true, 'Username is required']},
    password: { type: String, required: [true, 'Password is required'], select: false },
    name: { type: String, required: [true, 'Name is required']},
    archived: Boolean
}));



