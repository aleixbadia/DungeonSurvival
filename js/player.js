"use strict";

class Player extends Creature {
  shoot(dt) {
    this.acc += dt;
    if (this.acc > 0.07) {
      let newBullet = new Bullet(this.canvas, this.x, this.y, this.attack, this.direction);
      game.bullets.push(newBullet);
      this.acc = 0;
    }
  }

  updatePosition(map, dt) {
    if (map["w"] && map["a"]) {
      this.y -= this.speed / 2;
      this.x -= this.speed / 2;
      this.direction = "wa"
      this.moving = true;
    } else if (map["w"] && map["d"]) {
      this.y -= this.speed / 2;
      this.x += this.speed / 2;
      this.direction = "wd"
      this.moving = true;
    } else if (map["s"] && map["a"]) {
      this.y += this.speed / 2;
      this.x -= this.speed / 2;
      this.direction = "sa"
      this.moving = true;
    } else if (map["s"] && map["d"]) {
      this.y += this.speed / 2;
      this.x += this.speed / 2;
      this.direction = "sd"
      this.moving = true;
    } else {
      if (map["w"]) {
        this.y -= this.speed;
        this.direction = "w"
        this.moving = true;
      }
      if (map["a"]) {
        this.x -= this.speed;
        this.direction = "a"
        this.moving = true;
      }
      if (map["s"]) {
        this.y += this.speed;
        this.direction = "s"
        this.moving = true;
      }
      if (map["d"]) {
        this.x += this.speed;
        this.direction = "d"
        this.moving = true;
      }
    }
    if (map["p"]) {
      this.shoot(dt);
    }
    if (!(map["w"] || map["a"] || map["s"] || map["d"])) {
      this.moving = false;
    }

    const screenTop = 0;
    const screenBottom = this.canvas.height;
    const screenLeft = 0;
    const screenRight = this.canvas.width;

    const playerTop = this.y;
    const playerBottom = this.y + this.size[1];
    const playerLeft = this.x;
    const playerRight = this.x + this.size[0];

    if (playerBottom > screenBottom) this.y = screenBottom - this.size[1];
    if (playerTop < screenTop) this.y = screenTop;
    if (playerRight > screenRight) this.x = screenRight - this.size[0];
    if (playerLeft < screenLeft) this.x = screenLeft;
  }
}
