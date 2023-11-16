const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Gestion de la création d'une salle
  socket.on('createRoom', () => {
    // Générer un code de salle unique (pour simplifier, nous utilisons un code aléatoire ici)
    const roomCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Joindre la salle associée à ce code
    socket.join(roomCode);

    // Informer le créateur de la salle du code
    socket.emit('roomCreated', roomCode);
  });

  // Gestion de la connexion à une salle existante
  socket.on('joinRoom', (roomCode) => {
    // Vérifier si la salle existe
    const room = io.sockets.adapter.rooms[roomCode];
    if (room && room.length < 2) {
      // Joindre la salle
      socket.join(roomCode);

      // Informer le joueur qu'il a rejoint la salle
      socket.emit('joinedRoom', roomCode);
    } else {
      // Informer le joueur que la salle est pleine ou n'existe pas
      socket.emit('roomError', 'La salle est pleine ou n\'existe pas.');
    }
  });

  // ... Ajoutez d'autres gestionnaires d'événements pour le jeu multijoueur

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
