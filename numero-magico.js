// Variables del juego
let secretNumber;
let attempts = 0;
let gameActive = true;

// Elementos del DOM
const userGuessInput = document.getElementById('user-guess');
const checkButton = document.getElementById('check-btn');
const newGameButton = document.getElementById('new-game-btn');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');

// Función para generar un número aleatorio entre 1 y 10
function generateSecretNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

// Función para inicializar el juego
function initGame() {
    secretNumber = generateSecretNumber();
    attempts = 0;
    gameActive = true;
    
    // Limpiar la interfaz
    userGuessInput.value = '';
    messageElement.textContent = '';
    messageElement.className = 'message';
    attemptsElement.textContent = '';
    
    // Enfocar el input para facilitar el ingreso
    userGuessInput.focus();
    
    console.log('Nuevo juego iniciado. Número secreto: ' + secretNumber); // Para depuración, se puede quitar en producción
}

// Función para verificar el intento del usuario
function checkGuess() {
    // Validar que el juego esté activo
    if (!gameActive) {
        return;
    }
    
    // Obtener el valor ingresado por el usuario
    const userGuess = parseInt(userGuessInput.value);
    
    // Validar que se haya ingresado un número
    if (isNaN(userGuess) || userGuess === '') {
        messageElement.textContent = 'Por favor, ingresa un número válido.';
        messageElement.className = 'message error';
        return;
    }
    
    // Validar que el número esté entre 1 y 10
    if (userGuess < 1 || userGuess > 10) {
        messageElement.textContent = 'Por favor, ingresa un número entre 1 y 10.';
        messageElement.className = 'message error';
        return;
    }
    
    // Incrementar el contador de intentos
    attempts++;
    
    // Comparar el intento con el número secreto
    if (userGuess === secretNumber) {
        // El usuario adivinó el número
        messageElement.textContent = '¡Felicidades! Has adivinado el número secreto.';
        messageElement.className = 'message success';
        attemptsElement.textContent = `Adivinaste el número en ${attempts} ${attempts === 1 ? 'intento' : 'intentos'}.`;
        gameActive = false;
    } else if (userGuess < secretNumber) {
        // El número secreto es mayor
        messageElement.textContent = 'El número secreto es mayor que el que ingresaste.';
        messageElement.className = 'message hint';
    } else {
        // El número secreto es menor
        messageElement.textContent = 'El número secreto es menor que el que ingresaste.';
        messageElement.className = 'message hint';
    }
    
    // Limpiar el input para el siguiente intento
    userGuessInput.value = '';
    userGuessInput.focus();
}

// Event Listeners
checkButton.addEventListener('click', checkGuess);

newGameButton.addEventListener('click', initGame);

// Permitir presionar Enter para enviar el intento
userGuessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Inicializar el juego al cargar la página
document.addEventListener('DOMContentLoaded', initGame);