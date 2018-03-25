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
    res.status(err.status || 500).json({ message: err.message });
})

mongoose.connect(process.env.DB_CONNECTION, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

var socket = require('socket.io')(server);
let users = [];
socket.on('connection', function (client) {
    client.on('authenticate', function (data) {
        const connectedUser = { user: data.user, sid: client.id };
        if (users.indexOf(connectedUser) == -1) {
            users.push(connectedUser);
        }
        sendMessage(client, data.user);
    });
    client.on('disconnect', function () {
        users = users.filter((x) => { return x.sid != client.id });
    });
});

server.listen(port, (err) => {
    console.log('listening on port: ' + port);
});

const sendMessage = (client, user) => {
    const milliseconds = getRandomNumber(10, 30) * 1000;
    setTimeout(() => {
        if (!client.connected)
            return;
        client.emit('notification', user.id);
        sendMessage(client, user);
    }, milliseconds);
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + max);
}