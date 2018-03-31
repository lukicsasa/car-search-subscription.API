const helper = require('./src/shared/helper');
const Subscription = require('./src/subscription/subscription');

let users = [];
module.exports = (server) => {
    var socket = require('socket.io')(server);
    socket.on('connection', function (client) {
        const connectedUser = {};
        client.on('authenticate', (data) => handleAuthenticateEvent(data, client));
        client.on('disconnect', function () {
            users = users.filter((x) => { return x.sid != client.id });
        });
    });
}

const handleAuthenticateEvent = (data, client) => {
    const connectedUser = { user: data.user, sid: client.id };
    if (users.indexOf(connectedUser) == -1) {
        users.push(connectedUser);
        sendMessage(client, data.user);
    }
}

const sendMessage = (client, user) => {
    const milliseconds = helper.getRandomNumber(10, 30) * 1000;
    setTimeout(() => {
        if (!client.connected)
            return;

        Subscription.getRandomDocument(user.id, (sub) => {
            if (sub)
                client.emit('notification', '"' + sub.name + '" is now available!');
        });
        sendMessage(client, user);
    }, milliseconds);
}
