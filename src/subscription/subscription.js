const mongoose = require('mongoose');
const helper = require('../shared/helper');

const Schema = mongoose.Schema;
const subscriptionSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    year: Number,
    make: String,
    model: String,
    trim: String,
    active: Boolean,
    dateCreated: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required'] }
});
    
subscriptionSchema.statics.getRandomDocument = function (userId, callback) {
    Subscription.count({ user: userId, active: true }, (err, count) => {
        if (count) {
            const rnd = helper.getRandomNumber(0, count - 1);
            Subscription.find({ user: userId, active: true }).skip(rnd).findOne().then(sub => {
                callback(sub);
            });
        }
    });
}

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;



