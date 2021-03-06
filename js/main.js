"use strict";

let stop = false;

let game; // instance of the Game
let splashScreen1; // Start Game Screen
let splashScreen2;
let gameScreen;
let gameOverScreen;

// Creates DOM elements from a string representation
// buildDom
function buildDom(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}

// -- SplashScreen1

function createSplashScreen1() {
  splashScreen1 = buildDom(`
  <main class="splashScreen1">
      <h1><img src="img/title.png" alt="title"></h1>
      <h2>DEFINITIVE EXPERIENCE</h2>
      <div class="text-box">
        <a id="start-button" href="#" class="btn btn-white btn-animate">START GAME</a>
      </div>
  </main>
	`);

  document.body.appendChild(splashScreen1);

  const startButton = splashScreen1.querySelector("#start-button");
  startButton.addEventListener("click", screen2);
}

function removeSplashScreen1() {
  // remove() is the DOM method that removes the Node from the page
  splashScreen1.remove();
}

// -- SplashScreen2

function createSplashScreen2() {
  splashScreen2 = buildDom(`
  <main class="splashScreen2">
    <img id="wasd-keys" src="img/wasd.png" alt="wasd-keys">
    <p id="wasd-text">DIRECTIONS</p>
    <img id="p-key" src="img/p-key.png" alt="p-key">
    <p id="p-text">SHOOT</p>
    <p>Oh, hello there and welcome to this dungeon! <br> <br>
      In case you don't know already, let me explain you what is all this about.
      This is a Dungeon that never ends and you need to survive as many rounds
      as possible inside of it. During each round, new monsters will show up and
      you will have to defeat them all. <br> <br>
      Sorry, I forgot to ask, what's your name?
    </p>
    <div>
      <input type="text" autocomplete="off"  id="name">
      <a id="name-button" href="#" class="btn btn-white btn-animate">TELL THE GUARDIAN</a>
    </div>
    <div style="display:none;">
      <audio id="introduction" preload="auto" controls="none" src="sounds/IntroDungeon.ogg"></audio>
    </div>  
  </main>
	`);

  document.body.appendChild(splashScreen2);
  let introductionVoice = splashScreen2.querySelector("#introduction");
  introductionVoice.volume = 0.3;
  introductionVoice.play();

  const startButton = splashScreen2.querySelector("#name-button");
  startButton.addEventListener("click", startGame);
}

function removeSplashScreen2() {
  // remove() is the DOM method that removes the Node from the page
  splashScreen2.remove();
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
        <img id="bullet-up" src="./img/bullet-up.png">
        <img id="bullet-down" src="./img/bullet-down.png">
        <img id="bullet-left" src="./img/bullet-left.png">
        <img id="bullet-right" src="./img/bullet-right.png">
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

function createGameOverScreen(name, score) {
  const allScores = JSON.parse(localStorage.getItem("score"));
  gameOverScreen = buildDom(`
  <main class="game-over-screen">
  <img src="img/gameover.png" alt="game-over">
  <span class="label">TOP SCORES</span>
  <ol id="scores-table"></ol>
  <span class="label">YOUR NAME ${name} - YOUR SCORE ${score}</span>
  <div>
    <a id="restart-button" href="#" class="btn btn-white btn-animate">RESTART</a>
  </div>
  <div style="display:none;">
    <audio id="gameover-music" preload="auto" controls="none" src="./sounds/GameOver.mp3"></audio>
    <audio id="gameover-voice" preload="auto" controls="none" src="./sounds/GameOverVoice.ogg"></audio>
  </div>
  </main>
`);

  //ADD MUSIC AND SOUND EFFECTS
  let gameOverVoice = gameOverScreen.querySelector("#gameover-voice");
  gameOverVoice.volume = 0.3;
  gameOverVoice.play();
  let gameOverMusic = gameOverScreen.querySelector("#gameover-music");
  gameOverMusic.volume = 0.3;
  gameOverMusic.play();

  //ADD EVENT LISTENER
  const button = gameOverScreen.querySelector("#restart-button");
  button.addEventListener("click", startGame);

  //ORDER ALL SCORES, GET SCORE'S LIST AND ADD TOP 5  
  let sortedArray = allScores.sort(( a, b ) => {
    if ( a.score < b.score ){
      return -1;
    }
    if ( a.score > b.score ){
      return 1;
    }
    return 0;
  });

  let scoresTable = gameOverScreen.querySelector("#scores-table");

  if (sortedArray.length>5) {
    for (let index = sortedArray.length; index > sortedArray.length-5; index--) {
      const element = sortedArray[index-1];
      var newItem = document.createElement("li");
      newItem.innerHTML = `NAME: ${element.name} - SCORE: ${element.score}`;
      scoresTable.appendChild(newItem);
    }
  }
  

  document.body.appendChild(gameOverScreen);
}

function removeGameOverScreen() {
  if (gameOverScreen !== undefined) {
    gameOverScreen.remove();
  }
}

// -- Setting the game state - screen2 , start or game over

function screen2() {
  removeSplashScreen1();
  createSplashScreen2();
}

function startGame() {
  let name = splashScreen2.querySelector("#name");
  if (name.value !== "") {
    removeSplashScreen2();
    removeGameOverScreen();

    createGameScreen();

    game = new Game(name.value);
    game.gameScreen = gameScreen;

    // Start game
    game.start();
  }
}

function endGame(name, score) {
  removeGameScreen();
  createGameOverScreen(name, score);
}

// Runs the function `createSplashScreen2` once all resources are loaded
window.addEventListener("load", createSplashScreen1);
