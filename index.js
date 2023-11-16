// Connexion au serveur Socket.IO
const socket = io();

// Fonction pour démarrer le mode Solo
function startSoloMode() {
    // Rediriger vers la page du mode Solo
    window.location.href = "solo.html";
}

// Fonction pour démarrer le mode Multijoueur
function startMultiplayerMode() {
    // Rediriger vers la page du mode Multijoueur
    window.location.href = "multijoueur.html";
}
