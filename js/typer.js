var timeElement = document.getElementById('timer');
var startButton = document.getElementById('startButton');
var thirtySeconds = 60 * 0.5; // LOL
var keyCodes = [];
var keyToPress = document.getElementById('keyToPress');
var pointsCounter = 0;
var pointsInHtml = document.getElementById('points');
var keyInterval;
var isRunning = false;


// ActionListener für den Startbutton
startButton.addEventListener('click', startTimers);

// onKeyUp listener für die gesamte Seite um den gedrückten KeyCode zu filtern
document.onkeyup = function (e) {
    if (!isRunning) {
        startTimers();
    }
    var keyPressed = e.keyCode;
    if (getKeyCode() === keyPressed) {
        pointsCounter++;
        updatePoints(pointsCounter);
        generateNewKey();
    }
}

function startTimers() {
    deactivateButton(startButton);
    switchKeyTimer();
    timeTimer(thirtySeconds);
}

/*Interval für die Uhr welche rückwärts zählt,
 Punkte werden bei Ablauf der Zeit zurückgesetzt und es ist möglich das Spiel erneut zu starten */
function timeTimer(duration) {
    isRunning = true;
    var time = duration, minutes, seconds;
    var timerInterval = setInterval(function () {
        minutes = parseInt(time / 60, 10)
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeElement.textContent = "time: " + minutes + ":" + seconds + " min";

        if (--time < 0) {
            clearInterval(timerInterval);
            clearInterval(keyInterval);
            isRunning = false;
            time = duration;
            startButton.innerText = "play again!";
            activateButon(startButton);
            var printPoints = "Du hast: " + pointsCounter + " Punkte erreicht!";
            alert(printPoints);
            pointsCounter = 0;
            updatePoints(pointsCounter);
        }
    }, 1000);
}

// Timer für die Generierung eines neuen Chars
function switchKeyTimer() {
    keyInterval = setInterval(generateNewKey, 700);
}

// returned den KeyCode der gedrückten Taste 
function getKeyCode() {
    var character = document.getElementById('keyToPress').innerHTML;
    var code = character.charCodeAt(0);
    return code;
}

/* ASCII 65-90 sind Grossbuchstaben, 
daher wird ein neuer KeyCode generiert welcher in den Char verwandelt wird und angezeigt wird*/
function generateNewKey() {
    var keyCode = Math.random() * (90 - 65) + 65;
    var newKey = String.fromCharCode(keyCode);
    keyToPress.innerHTML = newKey;
}

// updated die Anzeige des Punktestandes
function updatePoints(points) {
    pointsInHtml.innerHTML = "points: " + points;
}

function deactivateButton(button) {
    button.disabled = true;
}

function activateButon(button) {
    button.disabled = false;
}