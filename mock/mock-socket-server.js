"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const events = [
  {id: 1, message: 'fall detection', code: '001', timestamp: null},
  {id: 2, message: 'wearing control', code: '002', timestamp: null},
  {id: 3, message: 'battery low', code: '003', timestamp: null},
  {id: 4, message: 'check position', code: '004', timestamp: null},
  {id: 1, message: 'fall detection', code: '001', timestamp: null},
  {id: 2, message: 'wearing control', code: '002', timestamp: null},
  {id: 3, message: 'battery low', code: '003', timestamp: null},
  {id: 4, message: 'check position', code: '004', timestamp: null},
  {id: 2, message: 'wearing control', code: '002', timestamp: null},
  {id: 3, message: 'battery low', code: '003', timestamp: null},
  {id: 3, message: 'battery low', code: '003', timestamp: null}
];

io.on('connection', function (socket) {
  console.log('connected');
  let socketInterval = setInterval(() => {
    const r = Math.floor((Math.random() * 10) + 1);
    const time = +new Date() / 1000 | 0;
    const e = events[r];
    e.timestamp = time;
    socket.emit('event', e);
  }, 5000);

  let globalInterval = setInterval(() => {
    io.emit('global', {message: 'A gloabl event was emitted'});
  }, 10000);


  socket.on('disconnect', function() {
    console.log('disconnected');
    clearInterval(socketInterval);
    clearInterval(globalInterval);
  })
});

http.listen(8080, function () {
  console.log('listening on *:8080');
});


