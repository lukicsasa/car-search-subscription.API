const mongoose = require('mongoose');
const encryption = require('../shared/encryption');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, required: [true, 'Username is required'] },
    password: { type: String, required: [true, 'Password is required'], select: false },
    name: { type: String, required: [true, 'Name is required'] },
    archived: { type: Boolean, required: [true, 'Archived is required'], default: false }
})

userSchema.pre('save', () => {
    if (!this.password)
        this.password = encryption.cryptPassword(this.password);
});
module.exports = mongoose.model('User', userSchema);



