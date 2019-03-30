import io from 'socket.io-client';
const URL = 'localhost:8080';

var socket = null;
// window.socket = socket;


(function () {
  socket = io.connect(URL, {query: `token=${localStorage.getItem('token')}&id=${localStorage.getItem('id')}`});
})();

const disconnect = () => {
  socket.disconnect(() => {
    socket = null;
  });
};

const emit = (event, data) => {
  return new Promise((resolve, reject) => {
    if (!socket) return reject('socket has been disconnected');
    socket.emit(event, {...data, id: localStorage.getItem('id'), token: localStorage.getItem('token')});
  });
};

const on = (event, cb) => {
  return new Promise( (resolve, reject) => {
    if (!socket) return  reject('socket has been disconnected');
    socket.on(event, (response) => cb(response));
  });
};

export {disconnect, on, emit};
