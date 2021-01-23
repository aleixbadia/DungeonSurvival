"use strict";

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.gameScreen = null;
    this.player = null;
    this.monsters = [];
    this.bullets = [];
    this.gameIsOver = false;
    this.score = 0;
    this.map = {};
  }

  start() {
    // Create `ctx`, a `player` and start the Canvas loop
    let canvasContainer = document.querySelector(".canvas-container");
    this.canvas = this.gameScreen.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Save reference to the score and live elements
    this.healthElement = this.gameScreen.querySelector(".health .value");
    this.scoreElement = this.gameScreen.querySelector(".score .value");

    // Set the canvas dimesions to match the parent
    this.containerWidth = canvasContainer.offsetWidth;
    this.containerHeight = canvasContainer.offsetHeight;
    this.canvas.setAttribute("width", this.containerWidth);
    this.canvas.setAttribute("height", this.containerHeight);

    this.player = new Player(
      this.canvas,
      100,
      10,
      5,
      200,
      0,
      "charset",
      [50, 50],
      [1, 0]
    );
    let monster1 = new Monster(
      this.canvas,
      100,
      10,
      1,
      50,
      0,
      "monsterSet",
      [50, 50 * 1.5],
      [10, 0]
    );
    let monster2 = new Monster(
      this.canvas,
      100,
      10,
      1,
      100,
      0,
      "monsterSet",
      [50, 50 * 1.5],
      [10, 0]
    );
    this.monsters.push(monster1);
    this.monsters.push(monster2);

    // Add event listener for moving the player - FALTA BLOQUEJAR AMB PARETS
    onkeydown = onkeyup = (e) => {
      this.map[e.key] = e.type == "keydown";
    };

    // Any function provided to eventListener is always invoked by the `window` global object
    // Therefore, we need to bind `this` to the `game` object,
    // to prevent `this` from referencing the `window` object

    this.startLoop();
  }

  startLoop() {
    const loop = function () {
      // 1. UPDATE POSITION OF PLAYER AND SHOOT STATUS
      

      // // 2. Check if player had hit any enemy (check all monsters)
      this.checkCollisions();

      // // 3. Update the player and check if player is going off the screen
      this.player.updatePosition(this.map)
      this.monsters.forEach((monster) => {
        monster.updatePosition(this.player);
      });
      this.bullets.forEach((bullet) => {
        bullet.updatePosition();
      });

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
    this.healthElement.innerHTML = this.player.health;
    this.scoreElement.innerHTML = this.score;
  }

  checkCollisions() {
    this.monsters.forEach((monster) => {
      // We will implement didCollide() in the next step
      if (this.player.didCollide(monster)) {
        this.player.takeDamage(monster.attack);
        console.log(this.player.health);

        // Move the monster
        monster.x = 0;
        monster.y = 0;

        if (this.player.health === 0) {
          this.gameOver();
        }
      }
    });

    this.bullets.forEach((bullet) => {
      this.monsters.forEach((monster, index) => {
        if (monster.didCollide(bullet)) {
          monster.takeDamage(bullet.attack);
          if (monster.health <= 0) {
            this.monsters.splice(index, 1);
          }
        }
      });
    });
    // We have to bind `this`
    // as array method callbacks `this` value defaults to undefined.
  }

  createMonsters() {}

  gameOver() {
    // flag `gameIsOver = true` stops the loop
    this.gameIsOver = true;

    // Call the `endGame` function from `main` to remove the Game screen
    // and show the Game Over Screen
    endGame(this.score);
  }
}
