module.exports = function (io) {
  io.use((socket, next) => require('../middleware/tokenChecker')(socket, next));

  io.on('login', (data) => require('./login').login(io, data, 'login'));
  io.on('register', (data) => require('./register').register(io, data, 'register'));
  io.on('auth', () => require('./auth').auth(io, 'auth'));
  io.on('logout', () => require('./logout').logout(io, 'logout'));
  io.on('get-all-team', (data) => require('./team').getAllTeam(io, data,'get-all-team'));
  io.on('create-team', (data) => require('./team').teamAdd(io, data, 'create-team'));
  io.on('get-one-team', (data) => require('./team').getById(io, data, 'get-one-team'));
  io.on('drop-team', (data) => require('./team').delete(io, data, 'drop-team'));
  io.on('update-name-team', (data) => require('./team').put(io, data, 'update-name-team'));
  io.on('check-user', (data) => require('./user').get(io, data, 'check-user'));

  io.on('create-board', (data) => require('./board').createBoard(io, data, 'create-board' ));
  io.on('get-all-boards', (data) => require('./board').getBoard(io, data, 'get-all-boards' ));
  io.on('drop-board', (data) => require('./board').delete(io, data, 'drop-board' ));
};