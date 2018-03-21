const BadRequestError = require('../shared/errors/BadRequestError');
const Subscription = require('./subscription');

module.exports.get = async (req, res, next) => {
    let subscriptions
    try {
        subscriptions = await Subscription.find();
    } catch(err){
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
    if(subscriptions > 0) {
        next(new BadRequestError('Name is already  in use!'));
        return;
    }

    const newSubscription = new Subscription({
        name: subscription.name,
        year: subscription.year,
        make: subscription.make,
        model: subscription.model,
        trim: subscription.trim,
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