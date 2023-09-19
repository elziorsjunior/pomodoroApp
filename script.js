const timerDisplay = document.getElementById("timer");
const timerText = document.getElementById("timerText");
const backgroundVideo = document.getElementById("backgroundVideo");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const restartButton = document.getElementById("restartButton");

let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isBreak = false;
let isPaused = false;
let pausedTimeLeft = 0; // Tempo restante quando pausado

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
}

function startPomodoro() {
    if (isPaused) {
        // Se estava pausado, continua de onde parou
        timeLeft = pausedTimeLeft;
        isPaused = false;
    } else {
        timeLeft = 1500; // 25 minutes in seconds
    }

    timerText.textContent = "Atenção Plena";
    timerDisplay.textContent = formatTime(timeLeft);
    backgroundVideo.play();

    startButton.style.display = "none";
    pauseButton.style.display = "inline-block";
    restartButton.style.display = "inline-block";

    timer = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            startBreak();
        }
    }, 1000);
}

function startBreak() {
    timeLeft = 300; // 5 minutes in seconds
    timerText.textContent = "Pausa";
    timerDisplay.textContent = formatTime(timeLeft);

    timer = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            resetPomodoro();
        }
    }, 1000);
}

function pausePomodoro() {
    clearInterval(timer);
    pausedTimeLeft = timeLeft;
    isPaused = true;

    timerText.textContent = "Volte ao trabalho...";
    backgroundVideo.pause();

    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    restartButton.style.display = "inline-block";
}

function resetPomodoro() {
    clearInterval(timer);
    timerText.textContent = "Pomodoro";
    timeLeft = 1500;
    timerDisplay.textContent = formatTime(timeLeft);
    backgroundVideo.pause();
    backgroundVideo.currentTime = 0;

    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    restartButton.style.display = "none";
}

startButton.addEventListener("click", startPomodoro);
pauseButton.addEventListener("click", pausePomodoro);
restartButton.addEventListener("click", resetPomodoro);
