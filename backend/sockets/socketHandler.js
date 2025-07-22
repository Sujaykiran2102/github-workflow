const rooms = {}; // In-memory store for room data

const handleSocket = (io, socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push(socket.id);
    io.to(roomId).emit('roomUpdate', rooms[roomId]);
  });

  socket.on('codeUpdate', ({ roomId, code }) => {
    socket.to(roomId).emit('receiveCode', code);
  });

  socket.on('submitCode', ({ roomId, result }) => {
    io.to(roomId).emit('battleResult', result);
  });

  socket.on('disconnect', () => {
    for (let roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
      io.to(roomId).emit('roomUpdate', rooms[roomId]);
    }
    console.log('User disconnected:', socket.id);
  });
};

module.exports = handleSocket;