const {User} = require('../lib/sequelize');

exports.login = function (io, data, action) {
    const {login, password} = data;

    User.login(login, password)
        .then(data => io.emit(action, data))
        .catch(err => io.emit(action, {error: err.message, code}));
};