const BadRequestError = require('../shared/errors/BadRequestError');
const Subscription = require('./subscription');

module.exports.get = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user.id });
        res.json(subscriptions);
    } catch (err) {
        next(err);
    }
}

module.exports.add = async (req, res, next) => {
    const subscription = req.body;
    try {
        const subscriptions = await Subscription.count({ user: req.user.id, name: subscription.name });
        if (subscriptions.length) {
            next(new BadRequestError('Name is already  in use!'));
            return;
        }

        const newSubscription = new Subscription({
            name: subscription.name,
            year: subscription.year,
            make: subscription.make,
            model: subscription.model,
            trim: subscription.trim,
            user: req.user.id
        });
        const result = await newSubscription.save();

        return res.json(result);
    } catch (ex) {
        if (err.name === 'ValidationError') {
            next(new BadRequestError(err));
            return;
        }
        next(err);
    }
}

module.exports.toggle = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOne({ _id: req.params.id });
        if (!subscription) {
            next(new BadRequestError('Doesn\'t exist!'));
            return;
        }
        subscription.active = !subscription.active;
        const result = await subscription.save();
        
        return res.json(result);
    } catch (ex) {
        next(ex);
    }
}