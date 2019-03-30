exports.auth = function(io, action) {
  io.emit(action, {auth: true});
};