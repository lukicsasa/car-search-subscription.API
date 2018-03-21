const logger = require('morgan'),
    errorHandler = require('errorhandler'),
    cors = require('cors'),
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv').config(),
    BadRequestError = require('./src/shared/errors/BadRequestError'),
    tokenAuthorize = require('./src/shared/tokenAuthorize');

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
    res.status(err.status || 500).json({message: err.message});
  })

mongoose.connect(process.env.DB_CONNECTION, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});

const port = process.env.PORT || 3000;
http.createServer(app).listen(port, (err) => {
    console.log('listening on port: ' + port);
});