"use strict";
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

class Game {
  constructor(name) {
    this.canvas = null;
    this.ctx = null;
    this.gameScreen = null;
    this.name = name;
    this.player = null;
    this.monsters = [];
    this.activeMonsters = [];
    this.bullets = [];
    this.gameIsOver = false;
    this.score = 0;
    this.map = {};
    this.round = 5;
    this.lastTime = 0;
    this.timeAccumulator = 0;
  }

  start() {
    // Create `ctx`, a `player` and start the Canvas loop
    console.log(this.name);
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

    // Play the background music of the game
    document.getElementById("background-music").play();

    this.player = new Player(
      this.canvas,
      10,
      10,
      5,
      this.canvas.width / 2 - 25,
      this.canvas.height / 2 - 25,
      "charset",
      [70, 70],
      [1, 0]
    );
    // this.createNewRound();

    // Add event listener for moving the player
    onkeydown = onkeyup = (e) => {
      this.map[e.key] = e.type == "keydown";
    };

    this.startLoop();
  }

  startLoop() {
    const loop = function () {
      // 1. UPDATE POSITION OF PLAYER AND SHOOT STATUS
      // // 1. Create a mesure of time for each loop and adds a new monster every 2 seconds
      let now = Date.now();
      let loopTime = (now - this.lastTime) / 1000.0;
      this.lastTime = now;
      this.timeAccumulator += loopTime;
      if (this.timeAccumulator > 10) {
        this.timeAccumulator = 0;
      }

      if (this.timeAccumulator > 2 && this.monsters.length > 0) {
        this.activeMonsters.push(this.monsters.pop());
        this.timeAccumulator = 0;
      }

      // // 2. Check all collisions between activeMonsters and player / bullets and activeMonsters
      this.checkCollisions();

      // // 3. Update positions and check if player, activeMonsters or bullets are going off the screen
      this.player.updatePosition(this.map, loopTime);
      this.activeMonsters.forEach((monster, indexM) => {
        monster.updatePosition(this.player, this.activeMonsters);
        if (monster.outOfScreen()) {
          this.activeMonsters.splice(indexM, 1);
        }
      });
      this.bullets.forEach((bullet, indexB) => {
        bullet.updatePosition();
        if (bullet.outOfScreen()) {
          this.bullets.splice(indexB, 1);
        }
      });

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. UPDATE THE CANVAS
      // // Draw the player
      this.player.draw(loopTime);

      // // Draw the activeMonsters
      this.activeMonsters.forEach(monster => {
        monster.draw(loopTime);
      });

      // // Draw the bullets
      this.bullets.forEach(bullet => {
        bullet.draw(loopTime);
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
    this.activeMonsters.forEach((monster) => {
      if (this.player.didCollide(monster)) {
        this.player.takeDamage(monster.attack);
        document.getElementById("damage-sound").currentTime = 0.5;
        document.getElementById("damage-sound").play();
        // Move the monster
        monster.x = this.canvas.width * Math.random() * 0.8;
        monster.y = this.canvas.height * Math.random() * 0.8;
      }
    });

    this.bullets.forEach((bullet) => {
      this.activeMonsters.forEach((monster) => {
        if (bullet.didCollide(monster)) {
          monster.takeDamage(bullet.attack);
          bullet.x = 0 - bullet.size;
          this.score += 10;
          if (monster.health <= 0) {
            monster.x = 0 - monster.size[0];
          }
        }
      });
    });

    if (this.player.health <= 0) {
      this.gameOver();
    }
    if (this.activeMonsters.length === 0 && this.monsters.length === 0) {
      this.createNewRound();
    }
  }

  createNewRound() {
    for (let i = 0; i < this.round; i++) {
      let monster = new Monster(
        this.canvas,
        10 * this.round,
        10,
        1,
        this.canvas.width * Math.random() * 0.8,
        this.canvas.height * Math.random() * 0.8,
        "monsterSet",
        [70, 70 * 1.5],
        [10, 0]
      );
      this.monsters.push(monster);
    }
    this.activeMonsters = this.monsters.splice(0, 1);
    this.round++;
  }

  gameOver() {
    // flag `gameIsOver = true` stops the loop
    this.gameIsOver = true;

    // Call the `endGame` function from `main` to remove the Game screen
    // and show the Game Over Screen
    endGame(this.score, this.name);
  }
}
