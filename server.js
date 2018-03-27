const logger = require('morgan');
const errorHandler = require('errorhandler');
const cors = require('cors');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const createSocket = require('./createSocket');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'dev') {
    app.use(logger('dev'));
    app.use(errorHandler());
}

app.use(require('./src/user/user-routes'));
app.use(require('./src/subscription/subscription-routes'));

app.use(function (err, req, res, next) {
    if (err) {
        res.status(err.status || 500).json({ err: err.message });
    } else {
        next();
    }
})

mongoose.connect(process.env.DB_CONNECTION, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

createSocket(server);
server.listen(port, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
        return;
    }
    console.log('listening on port: ' + port);
});