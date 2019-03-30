const {User, Team} = require('../lib/sequelize');

exports.getAllTeam = (io, data, action) => {
  const {id} = data;
  User.findByPk(parseInt(id))
      .then(user => {
          user.getTeams().then(teams => io.emit(action, teams.map(team => ({
              id: team.id,
              name: team.name
          }))));
      })
      .catch(err => {
          console.log(err);
          io.emit(action, {error: 'странная ошибочка сервера, хз что это за ошибка должна быть'});
      });
};

exports.getById = (io, data, action) => {
  const {idTeam, id} = data;

    Team.findByPk(parseInt(idTeam))
        .then( team => {
            User.findAll({
                include: [{
                    model: Team,
                    where: { id: parseInt(id) }
                }]
            }).then(users => {
                const filterUsers = users.map(user => {return {id: user.id, login: user.login}});
                io.emit(action, {team: {name: team.name, id: team.id, users: filterUsers}});
            });
        })
        .catch(err => {
            io.emit(action, {errors: 'error is 500'});
        });
};

exports.teamAdd = (io, data, action) =>  {
    const {name, users, id} = data;

    User.findByPk(parseInt(id))
        .then(user => {
            Team.findOne({where: {name}})
                .then(item => {
                    if (item) return io.emit(action, {errors: "this team exist"});
                    Team.create({name})
                        .then(team => {
                            users.forEach(id => User.findByPk(id).then(user => user.addTeam(team)));
                            user.addTeam(team).then(user => io.emit(action, {message: "team is created"}))
                        })
                        .catch(err => io.emit(action, {errors: err}));
                })
                .catch(err => io.emit(action, {errors: err}));
        })
        .catch(err => {
            console.log(err);
            return io.emit(action, {errors: 'что-то пошло не так как надо'});
        });
};

exports.delete = (io, data, action) => {
    const {idTeam, id} = data;

    User.findByPk(parseInt(id))
        .then(user => {
            Team.findByPk(parseInt(idTeam))
                .then(team => {
                    if (!team) io.emit(action, {message: "this team is not exist"});
                    team.destroy().then(_ =>  io.emit(action, {id: idTeam, message: "team has been droped"}));
                })
                .catch(_ => io.emit(action, {errors: 'errors is 500'}));
        })
        .catch(err => {
            return io.emit(action, {errors: err});
        });
};

exports.put = (io, data, action) => {
  const {idTeam, name} = data;
  Team.findByPk(parseInt(idTeam))
    .then(team => {
        if (!team) io.emit(action, {errors: "this team is not exist"});
        team.update({name: name}).then(_ =>  io.emit(action, {message: "изменения сохранены"}));
    })
    .catch(_ => io.emit(action, {errors: "error is 500"}));
};