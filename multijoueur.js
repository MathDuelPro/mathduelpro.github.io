// Connexion au serveur Socket.IO
const socket = io();

// ... (votre code existant)

// Fonction pour démarrer la partie multijoueur
function startMultiplayerGame(roomCode) {
    // Joindre la salle spécifiée par le code
    socket.emit('joinRoom', roomCode);

    // Gestion des événements pour la partie multijoueur
    socket.on('joinedRoom', (roomCode) => {
        document.getElementById('roomCode').innerText = 'Code de la salle : ' + roomCode;
        // ... (gérer d'autres événements spécifiques au mode multijoueur)
    });

    socket.on('roomError', (errorMessage) => {
        alert(errorMessage);
        // Rediriger vers la page d'accueil en cas d'erreur
        window.location.href = "index.html";
    });
}

// ... (votre code existant)
