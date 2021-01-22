"use strict";

class Game {
  constructor(){
    this.canvas = null;
    this.ctx = null;
    this.gameScreen = null;
    this.player = null;
    this.monsters = [];
    this.bullets = [];
    this.gameOver = false;
    this.score = 0;
  }

  start(){
    // Create `ctx`, a `player` and start the Canvas loop
    let canvasContainer = document.querySelector(".canvas-container");
    this.canvas = this.gameScreen.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Save reference to the score and live elements
    this.livesElement = this.gameScreen.querySelector(".lives .value");
    this.scoreElement = this.gameScreen.querySelector(".score .value");

    // Set the canvas dimesions to match the parent
    this.containerWidth = canvasContainer.offsetWidth;
    this.containerHeight = canvasContainer.offsetHeight;
    this.canvas.setAttribute("width", this.containerWidth);
    this.canvas.setAttribute("height", this.containerHeight);

    this.player = new Player(this.canvas, 100, 10, 5, 150, 0, "#ff0000");
    let monster1 = new Creature(this.canvas, 100, 10, 5, 50, 0, "#4dff00");
    let monster2 = new Creature(this.canvas, 100, 10, 5, 100, 0, "#00fff7");
    this.monsters.push(monster1);
    this.monsters.push(monster2);

    // Add event listener for moving the player - FALTA BLOQUEJAR AMB PARETS
    function handleKeyDown(event) {
      if (event.key === "w") {
        this.player.y -= this.player.speed;
        console.log("w");
      } else if (event.key === "a") {
        this.player.x -= this.player.speed;
      } else if (event.key === "s") {
        this.player.y += this.player.speed;
      } else if (event.key === "d") {
        this.player.x += this.player.speed;
      } else if (event.key === "p") {
        this.player.shoot();
      }
    }

    // Any function provided to eventListener is always invoked by the `window` global object
    // Therefore, we need to bind `this` to the `game` object,
    // to prevent `this` from referencing the `window` object

    const boundHandleKeyDown = handleKeyDown.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);

    this.startLoop();
  }

  startLoop(){
    const loop = function () {
      // 1. UPDATE THE STATE OF PLAYER AND MONSTERS

      // // 2. Check if player had hit any enemy (check all monsters)
      this.checkCollisions();

      // // 3. Update the player and check if player is going off the screen
      this.bullets.forEach(bullet => {
        bullet.updatePosition();
      })

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. UPDATE THE CANVAS
      // // Draw the player
      this.player.draw();

      // // Draw the monsters
      this.monsters.forEach(function (monster) {
        monster.draw();
      });

      // // Draw the bullets
      this.bullets.forEach(function (bullet) {
        bullet.draw();
      });

      // 4. TERMINATE LOOP IF THE GAME IS OVER
      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }

      // 5. UPDATE GAME STATUS
      this.updateGameStats();
    }.bind(this);

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we have to bind the function so that value of `this` is
    // pointing to the `game` object, like this:
    // var loop = function(){}.bind(this);

    window.requestAnimationFrame(loop);
  }

  updateGameStats() {
    this.livesElement.innerHTML = this.player.health;
    this.scoreElement.innerHTML = this.score;
  }

  checkCollisions(){
    this.monsters.forEach(monster => {
      // We will implement didCollide() in the next step
      if (this.player.didCollide(monster)) {
        this.player.takeDamage(monster.attack);
        console.log("health", this.player.health);

        // Move the monster
        monster.x = 0;
        monster.y = 0;

        if (this.player.lives === 0) {
          this.gameOver();
        }
      }
    });
    // We have to bind `this`
    // as array method callbacks `this` value defaults to undefined.
  }

  createMonsters(){
  }
}
