const BadRequestError = require('../shared/errors/BadRequestError');
const User = require('./user');
const jwt = require('jsonwebtoken');
const encryption = require('../shared/encryption');

module.exports.register = async (req, res, next) => {
    const user = req.body;
    try {
        const users = await User.count({ username: user.username });
        if (users.length) {
            next(new BadRequestError('Username already exists!'));
            return;
        }

        const password = await encryption.cryptPassword(user.password);
        const newUser = new User({
            name: user.name,
            username: user.username,
            password: password
        });
        const result = await newUser.save();
        delete result.password;

        return res.json(result);
    } catch (ex) {
        if (err.name === 'ValidationError') {
            next(new BadRequestError(err));
            return;
        }
        next(err);
    }
}

module.exports.login = async (req, res, next) => {
    const login = req.body;
    try {
        const user = await User.findOne({ username: login.username }).select('+password');

        if (!user || !encryption.comparePassword(login.password, user.password)) {
            next(new BadRequestError('Username or password are not valid!'));
            return;
        }
        const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET_KEY, {
            expiresIn: '1 day'
        });

        return res.json({ user: { id: user.id, name: user.name, username: user.username }, token: token });
    } catch (err) {
        next(err);
    }
}