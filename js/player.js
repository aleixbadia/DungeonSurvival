"use strict";

class Player extends Creature {
  shoot() {}

  updatePosition(map) {
    if (map["w"] && map["a"]) {
      this.y -= this.speed / 2;
      this.x -= this.speed / 2;
    } else if (map["w"] && map["d"]) {
      this.y -= this.speed / 2;
      this.x += this.speed / 2;
    } else if (map["s"] && map["a"]) {
      this.y += this.speed / 2;
      this.x -= this.speed / 2;
    } else if (map["s"] && map["d"]) {
      this.y += this.speed / 2;
      this.x += this.speed / 2;
    } else {
      if (map["w"]) {
        this.y -= this.speed;
      }
      if (map["a"]) {
        this.x -= this.speed;
      }
      if (map["s"]) {
        this.y += this.speed;
      }
      if (map["d"]) {
        this.x += this.speed;
      }
    }
    if (map["p"]) {
      this.shoot();
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
