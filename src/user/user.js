const mongoose = require('mongoose');

const Schema = mongoose.Schema;
module.exports = mongoose.model('User', new Schema({
    username: String,
    password: { type: String, select: false },
    name: String,
    archived: Boolean,
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
}));



