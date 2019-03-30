exports.logout = function(io, action) {
    io.emit(action, {message: 'ok'});
};