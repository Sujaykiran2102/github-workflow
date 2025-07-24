const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const handleSocket = require('./sockets/socketHandler');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  handleSocket(io, socket);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
