"use strict";

let stop = false;

let game; // instance of the Game
let splashScreen; // Start Game Screen
let gameScreen;
let gameOverScreen;

let introductionVoice;

// Creates DOM elements from a string representation
// buildDom
function buildDom(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}

// -- splash screen

function createSplashScreen() {
  splashScreen = buildDom(`
  <main class="splashScreen">
      <h1>Dungeon Survival</h1>
      <div class="splashContent">
        <img src="img/wizard.png" alt="Wizard">
        <div>
          <p>Oh, hello there and welcome to this dungeon! <br>
            In case you don't know already, let me explain you what is all this about.
            This is a Dungeon that never ends and you need to <br> survive as many rounds
            as possible inside of it. During each round, new monsters will show up and
            you will have to defeat them all. <br>
            Sorry, I forgot to ask, what's your name?
          </p>
          <div>
            <input type="text" id="name">
            <button>Tell the wizard</button>
          </div>
        </div>
      </div>
      <div style="display:none;">
      <audio id="introduction" preload="auto" controls="none" src="sounds/IntroDungeon.ogg"></audio>
      </div>  
  </main>
	`);

  document.body.appendChild(splashScreen);

  introductionVoice = document.querySelector("#introduction");
  introductionVoice.volume = 0.3;
  introductionVoice.play();

  const startButton = splashScreen.querySelector("button");
  startButton.addEventListener("click", startGame);
}

function removeSplashScreen() {
  // remove() is the DOM method that removes the Node from the page
  splashScreen.remove();
}

// -- game screen

function createGameScreen() {
  gameScreen = buildDom(`
    <main class="game-container">
      <header>
        <div class="health">
          <span class="label">Health:</span>
          <span class="value"></span>
        </div>

        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>

      <div class="canvas-container">
        <canvas></canvas>
      </div>
      <div style="display:none;">
        <img id="charset" src="./img/charset.png">
        <img id="monsterSet" src="./img/monsterSet.png">
        <img id="bullet" src="./img/bullet.png">
        <audio id="background-music" preload="auto" controls="none" src="sounds/game.mp3"></audio>
        <audio id="damage-sound" preload="auto" controls="none" src="sounds/Damage.ogg"></audio>
        <audio id="shoot-sound" preload="auto" controls="none" src="sounds/270336__littlerobotsoundfactory__shoot-02.wav"></audio>
      </div>
    </main>
	`);

  document.body.appendChild(gameScreen);
  return gameScreen;
}

function removeGameScreen() {
  gameScreen.remove();
}

// -- game over screen

function createGameOverScreen(score) {
  gameOverScreen = buildDom(`
  <main>
    <h1>Game over</h1>
    <p>Your score: <span> ${score} </span></p>
    <button>Restart</button>
    <div style="display:none;">
        <audio id="gameover-music" preload="auto" controls="none" src="./sounds/GameOver.mp3"></audio>
        <audio id="gameover-voice" preload="auto" controls="none" src="./sounds/GameOverVoice.ogg"></audio>
      </div>
  </main>
`);
  let gameOverVoice = gameOverScreen.querySelector("#gameover-voice");
  gameOverVoice.volume = 0.3;
  gameOverVoice.play();
  let gameOverMusic = gameOverScreen.querySelector("#gameover-music");
  gameOverMusic.volume = 0.3;
  gameOverMusic.play();
  const button = gameOverScreen.querySelector("button");
  button.addEventListener("click", startGame);

  document.body.appendChild(gameOverScreen);
}

function removeGameOverScreen() {
  if (gameOverScreen !== undefined) {
    gameOverScreen.remove();
  }
}

// -- Setting the game state - start or game over

function startGame() {
  removeSplashScreen();
  removeGameOverScreen();

  createGameScreen();

  game = new Game();
  game.gameScreen = gameScreen;

  // Start game
  game.start();
}

function endGame(score) {
  removeGameScreen();
  createGameOverScreen(score);
}

// Runs the function `createSplashScreen` once all resources are loaded
window.addEventListener("load", createSplashScreen);
