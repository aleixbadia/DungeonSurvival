"use strict";

class Creature {
  constructor(canvas, health, attack, speed, x, y, imageID, size, index) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.image = document.getElementById(imageID);
    this.size = size; // this is an array [width,height]
    this.index = index; //this is an array [x,y] to choose creature of the sprite

    this.health = health;
    this.attack = attack;
    this.speed = speed;
  }

  didCollide(element) {
    const playerLeft = this.x;
    const playerRight = this.x + this.size[0];
    const playerTop = this.y;
    const playerBottom = this.y + this.size[1];

    const elementLeft = element.x;
    const elementRight = element.x + element.size[0];
    const elementTop = element.y;
    const elementBottom = element.y + element.size[1];

    // Check if the element sides intersect with any of the player's sides
    const crossLeft = elementLeft <= playerRight && elementLeft >= playerLeft;

    const crossRight = elementRight >= playerLeft && elementRight <= playerRight;

    const crossBottom = elementBottom >= playerTop && elementBottom <= playerBottom;

    const crossTop = elementTop <= playerBottom && elementTop >= playerTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    this.ctx.drawImage( //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      this.image,
      this.image.width / 12 * this.index[0],
      this.image.width / 8 * this.index[1],
      this.image.width / 12,
      this.image.height / 8,
      this.x,
      this.y,
      this.size[0],
      this.size[1]
    );
  }

  takeDamage(attack) {
    this.health -= attack;
  }
}
