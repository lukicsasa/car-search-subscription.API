const express = require('express'),
    subscriptionController = require('./subscriptionController'),
    tokenAuthorize = require('../shared/tokenAuthorize');

const app = express.Router();

app.get('/',tokenAuthorize, subscriptionController.get);
app.post('/',tokenAuthorize, subscriptionController.add);
// app.post('/toggleSubscription',tokenAuthorize, subscriptionController.toggleSubscription);
app.use('/api/subscription', app);
module.exports = app;