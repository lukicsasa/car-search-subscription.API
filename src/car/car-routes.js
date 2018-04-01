const express = require('express');
const carController = require('./carController');
const tokenAuthorize = require('../shared/tokenAuthorize');

const app = express.Router();

app.get('/years' ,tokenAuthorize,carController.getYears);
app.get('/makes', tokenAuthorize,carController.getMakes);
app.get('/models', tokenAuthorize,carController.getModels);
app.get('/trims',tokenAuthorize, carController.getTrims);
app.use('/api/car', app);

module.exports = app;
