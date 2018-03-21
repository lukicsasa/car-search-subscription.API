var bcrypt = require('bcrypt');

exports.cryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        throw err;
    }
};

exports.comparePassword = async (plainPass, hashPass) => {
    try {
        const isPasswordMatch = await bcrypt.compare(plainPass, hashPass);
        return isPasswordMatch;
    } catch (err) {
        throw err;
    }

};