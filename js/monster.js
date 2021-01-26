"use strict";

class Monster extends Creature {
  updatePosition(player, monsters) {
    this.moving = true;
    const monstersClean = monsters.filter((monster) => monster !== this);
    let collision = false; //with other monsters
    let continueLoop = true;
    let collidedMonster;
    monstersClean.forEach((monster) => {
      if (this.didCollide(monster)) {
        collision = true;
        collidedMonster = monster;
      }
    });

    if (!collision) {
      if (this.x > player.x && this.y > player.y) {
        continueLoop = false;
        this.x -= this.speed / 2;
        this.y -= this.speed / 2;
        monstersClean.forEach((monster) => {
          if (this.didCollide(monster) || !(this.x > player.x && this.y > player.y)) {
            this.x += this.speed / 2;
            this.y += this.speed / 2;
            continueLoop = true;
          }
        });
        if (!continueLoop) {
          this.direction = "wa";
        }
      }
      if (this.x > player.x && this.y < player.y && continueLoop) {
        continueLoop = false;
        this.x -= this.speed / 2;
        this.y += this.speed / 2;
        monstersClean.forEach((monster) => {
          if (this.didCollide(monster) || !(this.x > player.x && this.y < player.y)) {
            this.x += this.speed / 2;
            this.y -= this.speed / 2;
            continueLoop = true;
          }
        });
        if (!continueLoop) {
          this.direction = "sa";
        }
      }
      if (this.x < player.x && this.y > player.y && continueLoop) {
        continueLoop = false;
        this.x += this.speed / 2;
        this.y -= this.speed / 2;
        monstersClean.forEach((monster) => {
          if (this.didCollide(monster) || !(this.x < player.x && this.y > player.y)) {
            this.x -= this.speed / 2;
            this.y += this.speed / 2;
            continueLoop = true;
          }
        });
        if (!continueLoop) {
          this.direction = "wd";
        }
      }
      if (this.x < player.x && this.y < player.y && continueLoop) {
        continueLoop = false;
        this.x += this.speed / 2;
        this.y += this.speed / 2;
        monstersClean.forEach((monster) => {
          if (this.didCollide(monster) || !(this.x < player.x && this.y < player.y)) {
            this.x -= this.speed / 2;
            this.y -= this.speed / 2;
            continueLoop = true;
          }
        });
        if (!continueLoop) {
          this.direction = "sd";
        }
      }
      if (this.x > player.x && continueLoop) {
        continueLoop = false;
        this.x -= this.speed;
        monstersClean.forEach((monster) => {
          if (this.didCollide(monster) || !(this.x > player.x)) {
            this.x += this.speed;
            continueLoop = true;
          }
        });
        if (!continueLoop) {
          this.direction = "a";
        }
      }
      if (this.x < player.x && continueLoop) {
        continueLoop = false;
        this.x += this.speed;
        monstersClean.forEach((monster) => {
          if (this.didCollide(monster) || !(this.x < player.x)) {
            this.x -= this.speed;
            continueLoop = true;
          }
        });
        if (!continueLoop) {
          this.direction = "d";
        }
      }
      if (this.y > player.y && continueLoop) {
        continueLoop = false;
        this.y -= this.speed;
        this.direction = "w";
        monstersClean.forEach((monster) => {
          if (this.didCollide(monster) || !(this.y > player.y)) {
            this.y += this.speed;
            continueLoop = true;
          }
        });
        if (!continueLoop) {
          this.direction = "w";
        }
      }
      if (this.y < player.y && continueLoop) {
        continueLoop = false;
        this.y += this.speed;
        this.direction = "s";
        monstersClean.forEach((monster) => {
          if (this.didCollide(monster) || !(this.y < player.y)) {
            this.y -= this.speed;
            continueLoop = true;
          }
        });
        if (!continueLoop) {
          this.direction = "s";
        }
      }
    } else if (this.x > collidedMonster.x) {
      this.x = collidedMonster.x + this.size + 1;
    } else {
      this.x = collidedMonster.x - this.size - 1;
    }
  }

  outOfScreen() {
    const screenTop = 0;
    const screenBottom = this.canvas.height;
    const screenLeft = 0;
    const screenRight = this.canvas.width;

    const monsterTop = this.y;
    const monsterBottom = this.y + this.size[1];
    const monsterLeft = this.x;
    const monsterRight = this.x + this.size[0];

    if (
      monsterBottom > screenBottom ||
      monsterTop < screenTop ||
      monsterRight > screenRight ||
      monsterLeft < screenLeft
    ) {
      return true;
    } else {
      return false;
    }
  }
}
