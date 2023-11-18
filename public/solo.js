var score = 0;
var timer;

// Fonction pour générer une équation mathématique avec des additions, des soustractions et des multiplications
function generateMathEquation() {
    var num1, num2, operator;

    // Choix aléatoire de l'opérateur
    operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];

    // Assurer que la réponse ne sera pas négative pour les soustractions
    if (operator === '-') {
        num1 = Math.floor(Math.random() * 900) + 100;  // Nombre de trois chiffres
        num2 = Math.floor(Math.random() * num1);        // Nombre inférieur à num1 pour éviter les résultats négatifs
    } else if (operator === '*') {
        num1 = Math.floor(Math.random() * 9) + 3;       // Nombre de deux chiffres (exclut 1 et 2)
        num2 = Math.floor(Math.random() * 9) + 3;       // Nombre de deux chiffres (exclut 1 et 2)
    } else {
        // Pour les additions, des nombres de trois chiffres
        num1 = Math.floor(Math.random() * 900) + 100;  // Nombre de trois chiffres
        num2 = Math.floor(Math.random() * 900) + 100;  // Nombre de trois chiffres
    }

    return num1 + ' ' + operator + ' ' + num2;
}

// Fonction pour vérifier la réponse de l'utilisateur
function checkAnswer() {
    // Récupérer l'équation actuelle
    var equationElement = document.getElementById('equation');
    var equation = equationElement.innerText;

    // Récupérer la réponse de l'utilisateur
    var userAnswerElement = document.getElementById('answer');
    var userAnswer = userAnswerElement.value;

    // Calculer la réponse correcte
    var correctAnswer = eval(equation);

    // Vérifier la réponse de l'utilisateur
    if (userAnswer === correctAnswer.toString()) {
        // Incrémenter le score
        score++;
        updateScore();

        // Générer une nouvelle équation
        equationElement.innerText = generateMathEquation();
        // Effacer la zone de réponse
        userAnswerElement.value = '';
    } else {
        // Indiquer que la réponse est incorrecte en rouge
        userAnswerElement.style.color = 'red';
    }
}

// Fonction pour réinitialiser la couleur du texte à noir lorsqu'une modification est détectée
function resetTextColor() {
    document.getElementById('answer').style.color = 'black';
}

// Fonction pour mettre à jour le score affiché
function updateScore() {
    document.getElementById('score').innerText = 'Score : ' + score;
}

// Fonction pour mettre à jour le minuteur
function updateTimer() {
    var timeElement = document.getElementById('time');
    var time = parseInt(timeElement.innerText);

    if (time > 0) {
        time--;
        timeElement.innerText = time;
    } else {
        // Afficher le score final avec une phrase personnalisée
        clearInterval(timer);

        var scoreMessage;
        if (score < 9) {
            scoreMessage = "Tu as eu " + score + ", tu es mauvais ! Entraîne-toi et reviens plus fort.";
        } else if (score >= 9 && score <= 18) {
            scoreMessage = "Tu as eu " + score + ", c'est pas mal, mais tu peux mieux faire !";
        } else {
            scoreMessage = "Tu as eu " + score + ", t'es vraiment bon tu sais, ça te dirait de rejoindre les Lakers ?";
        }

        alert('Temps écoulé. ' + scoreMessage);
    }
}


// Fonction pour actualiser le test (recommencer)
function refreshTest() {
    // Réinitialiser le score et le minuteur
    score = 0;
    updateScore();
    clearInterval(timer);
    document.getElementById('time').innerText = 100;

    // Générer une nouvelle équation
    document.getElementById('equation').innerText = generateMathEquation();

    // Effacer la zone de réponse
    document.getElementById('answer').value = '';

    // Réinitialiser la couleur du texte
    document.getElementById('answer').style.color = 'black';

    // Redémarrer le minuteur
    timer = setInterval(updateTimer, 1000);
}

// Initialiser avec une équation et démarrer le minuteur au chargement de la page
document.getElementById('equation').innerText = generateMathEquation();
updateScore();
timer = setInterval(updateTimer, 1000);

// Ajouter un gestionnaire d'événements pour réinitialiser la couleur du texte lors de la modification de la réponse
document.getElementById('answer').addEventListener('input', resetTextColor);