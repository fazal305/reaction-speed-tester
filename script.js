/* 
   HTML ELEMENTS
*/

const gameScreen = document.getElementById("gameScreen");
const gameTitle = document.getElementById("gameTitle");
const gameMessage = document.getElementById("gameMessage");
const startBtn = document.getElementById("startBtn");
const bestScore = document.getElementById("bestScore");
const historyList = document.getElementById("historyList");
const resetBestBtn = document.getElementById("resetBestBtn");


/* 
   GAME VARIABLES
*/

let gameState = "waiting";
let goTime = 0;
let delayTimer = null;
let attempts = [];


/* 
   LOAD SAVED BEST SCORE
*/

let personalBest =
  localStorage.getItem("reactionBest");


/* 
   SHOW SAVED BEST SCORE
*/

if (personalBest !== null) {
  bestScore.textContent = `${personalBest}ms`;
}


/* 
   CHANGE GAME STATE
*/

function setGameState(newState) {

  gameState = newState;

  gameScreen.className = "game-screen";

  gameScreen.classList.add(newState);
}


/* 
   PLAY SIMPLE BEEP SOUND
*/

function playBeepSound() {

  const audioContext = new AudioContext();

  const oscillator =
    audioContext.createOscillator();

  const gainNode =
    audioContext.createGain();

  oscillator.type = "sine";

  oscillator.frequency.value = 650;

  gainNode.gain.value = 0.15;

  oscillator.connect(gainNode);

  gainNode.connect(
    audioContext.destination
  );

  oscillator.start();

  setTimeout(function () {

    oscillator.stop();

    audioContext.close();

  }, 120);
}


/* 
   VIBRATE MOBILE DEVICE
*/

function vibrateDevice() {

  if (navigator.vibrate) {
    navigator.vibrate(80);
  }
}


/* 
   START GAME
*/

function startGame(event) {

  event.stopPropagation();

  setGameState("countdown");

  gameTitle.textContent =
    "Wait for it...";

  gameMessage.textContent =
    "Do not click yet. Wait for the colour flash.";

  startBtn.style.display = "none";

  const randomDelay =
    Math.floor(Math.random() * 2500) + 1500;

  delayTimer =
    setTimeout(showGoState, randomDelay);
}


/* 
   SHOW GO STATE
*/

function showGoState() {

  setGameState("go");

  gameTitle.textContent =
    "CLICK NOW!";

  gameMessage.textContent =
    "Tap anywhere as fast as possible!";

  goTime = Date.now();

  playBeepSound();

  vibrateDevice();
}


/* 
   HANDLE SCREEN CLICK
*/

function handleScreenClick() {

  if (
    gameState === "waiting" ||
    gameState === "result" ||
    gameState === "tooearly"
  ) {
    return;
  }

  if (gameState === "countdown") {

    clearTimeout(delayTimer);

    showTooEarly();

    return;
  }

  if (gameState === "go") {

    const clickTime = Date.now();

    const reactionTime =
      clickTime - goTime;

    showResult(reactionTime);
  }
}


/* 
   SHOW RESULT
*/

function showResult(reactionTime) {

  setGameState("result");

  const rating =
    getReactionRating(reactionTime);

  gameTitle.textContent =
    `${reactionTime}ms`;

  gameMessage.textContent = rating;

  updateScores(reactionTime);

  startBtn.textContent =
    "Play Again";

  startBtn.style.display =
    "inline-block";
}


/* 
   SHOW TOO EARLY MESSAGE
*/

function showTooEarly() {

  setGameState("tooearly");

  gameTitle.textContent =
    "Too Early!";

  gameMessage.textContent =
    "You jumped the gun 💀";

  startBtn.textContent =
    "Try Again";

  startBtn.style.display =
    "inline-block";

  vibrateDevice();
}


/* 
   REACTION RATING SYSTEM
*/

function getReactionRating(milliseconds) {

  if (milliseconds < 200) {
    return "Superhuman ⚡";
  }

  if (milliseconds <= 300) {
    return "Elite Reflexes 🔥";
  }

  if (milliseconds <= 400) {
    return "Above Average 👍";
  }

  if (milliseconds <= 500) {
    return "Average Human 😐";
  }

  return "Are you okay? 💀";
}


/* 
   UPDATE SCORES
*/

function updateScores(reactionTime) {

  attempts.unshift(reactionTime);

  attempts = attempts.slice(0, 5);

  if (
    personalBest === null ||
    reactionTime < Number(personalBest)
  ) {

    personalBest = reactionTime;

    bestScore.textContent =
      `${personalBest}ms`;

    localStorage.setItem(
      "reactionBest",
      personalBest
    );
  }

  renderHistory();
}


/* 
   RENDER HISTORY LIST
*/

function renderHistory() {

  historyList.innerHTML = "";

  attempts.forEach(function (
    attempt,
    index
  ) {

    const listItem =
      document.createElement("li");

    listItem.textContent =
      `Attempt ${index + 1}: ${attempt}ms - ${getReactionRating(attempt)}`;

    historyList.appendChild(listItem);

  });
}


/* 
   RESET BEST SCORE
*/

function resetBestScore(event) {

  event.stopPropagation();

  personalBest = null;

  localStorage.removeItem(
    "reactionBest"
  );

  bestScore.textContent =
    "No attempts yet";
}


/* 
   EVENT LISTENERS
*/

startBtn.addEventListener(
  "click",
  startGame
);

gameScreen.addEventListener(
  "click",
  handleScreenClick
);

resetBestBtn.addEventListener(
  "click",
  resetBestScore
);