const express = require('express'),
    userController = require('./userController'),
    tokenAuthorize = require('../shared/tokenAuthorize');

const app = express.Router();

app.post('/login', userController.login);
app.post('/register', userController.register);
app.use('/api/user', app);
module.exports = app;
