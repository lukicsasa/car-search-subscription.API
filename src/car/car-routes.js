const express = require('express');
const carController = require('./carController');
const tokenAuthorize = require('../shared/tokenAuthorize');

const app = express.Router();

app.get('/filter', tokenAuthorize, carController.filter)
app.use('/api/car', app);

module.exports = app;
