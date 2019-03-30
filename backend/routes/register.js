const {ConfirmPasswordError, InteractionDBError, UserExistError} = require("../models/mysql/user");
const {User} = require('../lib/sequelize');

exports.register = function(io, data, action) {
    const {login, password, confirmPassword} = data;

    console.log(io.id);

    User.register(login, password, confirmPassword)
        .then(_ => io.emit(action, {message: "ok"}))
        .catch(err => {
            if (err instanceof UserExistError) {
                io.emit(action, {error: err.message});
            }
            if (err instanceof ConfirmPasswordError) {
                io.emit(action, {error: err.message});
            }

            if (err instanceof InteractionDBError) {
                io.emit(action, {error: err.message});
            }
        });
};