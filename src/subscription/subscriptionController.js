const BadRequestError = require('../shared/errors/BadRequestError');
const Subscription = require('./subscription');

module.exports.get = async (req, res, next) => {
    let subscriptions
    try {
        subscriptions = await Subscription.find({user: req.user.id});
    } catch (err) {
        next(err);
    }

    res.json(subscriptions);
}

module.exports.add = async (req, res, next) => {
    const subscription = req.body;

    let subscriptions;
    try {
        subscriptions = await Subscription.count({ name: subscription.name });
    } catch (ex) {
        next(ex);
        return;
    }
    if (subscriptions > 0) {
        next(new BadRequestError('Name is already  in use!'));
        return;
    }

    const newSubscription = new Subscription({
        name: subscription.name,
        year: subscription.year,
        make: subscription.make,
        model: subscription.model,
        trim: subscription.trim,
        dateCreated: new Date(),
        active: true,
        user: req.user.id
    });

    try {
        const result = await newSubscription.save();
        return res.json(result);
    } catch (ex) {
        next(ex);
    }
}

module.exports.toggle = async (req, res, next) => {
    let subscription;
    try {
        subscription = await Subscription.findOne({ _id: req.params.id });
    } catch (ex) {
        next(ex);
        return;
    }
    if (!subscription) {
        next(new BadRequestError('Doesn\'t exist!'));
        return;
    }

    subscription.active = !subscription.active;

    try {
        const result = await subscription.save();
        return res.json(result);
    } catch (ex) {
        next(ex);
    }
}