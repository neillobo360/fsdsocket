const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // Create the HTTP server using Express
const io = socketIo(server); // Initialize socket.io with the server

// Serve static files (like HTML, CSS, etc.)
app.use(express.static('public'));

// Listen for incoming connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id); // Log when a user connects

  // Listen for the 'send_message' event from the client
  socket.on('send_message', (data) => {
    console.log('Message received:', data.message, 'at', data.timestamp);

    // Broadcast the message to all connected clients (including the sender)
    io.emit('message', { 
      message: data.message, 
      timestamp: data.timestamp, 
      isSentByUser: true // Mark the message as sent by the user
    });
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id); // Log when a user disconnects
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
