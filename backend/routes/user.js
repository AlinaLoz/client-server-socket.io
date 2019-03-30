const {User} = require('../lib/sequelize');

exports.get = (io, data, action) => {
    const {login} = data;

    User.findOne({where: {login}})
        .then(user => {
            if (user) {
                io.emit(action, {id:user.id, login: user.login});
            } else {
              io.emit(action, {errors: "user is not exist"});
            }})
        .catch(err => io.emit(action, {errors: "user is not exist"}));
};
