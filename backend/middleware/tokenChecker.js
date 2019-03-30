const jwt = require('jsonwebtoken');
const conf = require('../config/config');

module.exports = function(socket, next) {
    const [action, query] = [...socket];

    if (action.match(/(register|login)/)) return next();
    const token = Object.keys(query).length && query.token;
    if (!token) return next(new Error('Not a doge error'));
    jwt.verify(token, conf.token.secret, function (err, decode) {
        if (err)  return next(new Error('Not a doge error'));
        if (decode.id != query.id) return next(new Error('Not a doge error'));
        next();
    });
};
