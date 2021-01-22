'use strict';

function main(){

  var gameAudio = new Audio('./sounds/game.mp3');
  var gameOverAudio = new Audio('./sounds/gameover.mp3');
  
  //===========CREATE SCREENS============================================================

  const mainElement = document.querySelector('main');

  function buildDom(html){
    mainElement.innerHTML = html;
    return mainElement;
  }
   //===========SPLASH SCREEN

  function buildSplashScreen(){
    buildDom(`

    <section class="game-container">
    <article class="logo-splash">

      <img src="./img/sf-logo.png">
      <img src="./img/splash-bright.png" class="img-bright">
      <button>PLAY NOW!</button>
      <p>Use the arrows ( 🡄 🡆 ) to move the character, when you are ready click and drag ( ⇚ ➚ ) to set the power and direction of the shot, be careful, don't hit yourself !</p>
    </article>
    </section>
    `)

    const buttonStart = document.querySelector('button');
    buttonStart.addEventListener('click',buildGameScreen);

  }

  //===========GAME SCREEN

  function buildGameScreen(){
    gameAudio.play();
    gameAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);

    buildDom(`
    <section class="game-container">
     <canvas></canvas>
    </section>
    `)

  //start game----------

    const containerElement = document.querySelector('.game-container');
    const gameWidth = containerElement.offsetWidth;
    const gameHeight = containerElement.offsetHeight;
    
    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',gameWidth);
    canvasElement.setAttribute('height',gameHeight);

    const game = new Game(canvasElement);
    game.start();
    game.startLoop();
    game.setGameOverCallBack(buildGameOverScreen);

  }
  //===========GAMEOVER SCREEN
  function buildGameOverScreen(){

    gameAudio.pause();
    gameAudio.currentTime = 0;
    gameOverAudio.play();
    buildDom(`
    <section class="game-container">
    <article class="logo-splash">

      <img src="" class="player-winner">
      <img src="./img/splash-bright.png" class="img-bright">
      <button>PLAY AGAIN</button>
      <p>"What a loser... try again!"</p>
    </article>
    </section>
    `)
    const buttonStart = document.querySelector('button');
    buttonStart.addEventListener('click',buildGameScreen)
  }
  buildSplashScreen();
}

window.addEventListener('load',main);