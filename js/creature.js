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
    this.acc = 0; //acumulator to regulate bullets per second in the method shoot
    this.direction = "s"; //inidcator of the direction of the creature for sprites and shooting
    this.moving = false;
  }

  didCollide(element) {
    const creatureLeft = this.x;
    const creatureRight = this.x + this.size[0];
    const creatureTop = this.y;
    const creatureBottom = this.y + this.size[1];

    const elementLeft = element.x;
    const elementRight = element.x + element.size[0];
    const elementTop = element.y;
    const elementBottom = element.y + element.size[1];

    // Check if the element sides intersect with any of the creature's sides
    const crossLeft =
      elementLeft <= creatureRight && elementLeft >= creatureLeft;

    const crossRight =
      elementRight >= creatureLeft && elementRight <= creatureRight;

    const crossBottom =
      elementBottom >= creatureTop && elementBottom <= creatureBottom;

    const crossTop = elementTop <= creatureBottom && elementTop >= creatureTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    if (this.moving === false) {
      if (
        this.direction === "w" ||
        this.direction === "wa" ||
        this.direction === "wd"
      ) {
        this.ctx.drawImage(
          //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          this.image,
          (this.image.width / 12) * this.index[0],
          (this.image.height / 8) * (this.index[1] + 3),
          this.image.width / 12,
          this.image.height / 8,
          this.x,
          this.y,
          this.size[0],
          this.size[1]
        );
      } else if (
        this.direction === "s" ||
        this.direction === "sa" ||
        this.direction === "sd"
      ) {
        this.ctx.drawImage(
          //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          this.image,
          (this.image.width / 12) * this.index[0],
          (this.image.height / 8) * this.index[1],
          this.image.width / 12,
          this.image.height / 8,
          this.x,
          this.y,
          this.size[0],
          this.size[1]
        );
      } else if (this.direction === "a") {
        this.ctx.drawImage(
          //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          this.image,
          (this.image.width / 12) * this.index[0],
          (this.image.height / 8) * (this.index[1] + 1),
          this.image.width / 12,
          this.image.height / 8,
          this.x,
          this.y,
          this.size[0],
          this.size[1]
        );
      } else if (this.direction === "d") {
        this.ctx.drawImage(
          //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          this.image,
          (this.image.width / 12) * this.index[0],
          (this.image.height / 8) * (this.index[1] + 2),
          this.image.width / 12,
          this.image.height / 8,
          this.x,
          this.y,
          this.size[0],
          this.size[1]
        );
      }
    } else {
      if (
        this.direction === "w" ||
        this.direction === "wa" ||
        this.direction === "wd"
      ) {
        this.ctx.drawImage(
          //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          this.image,
          (this.image.width / 12) * this.index[0],
          (this.image.height / 8) * (this.index[1] + 3),
          this.image.width / 12,
          this.image.height / 8,
          this.x,
          this.y,
          this.size[0],
          this.size[1]
        );
      } else if (
        this.direction === "s" ||
        this.direction === "sa" ||
        this.direction === "sd"
      ) {
        this.ctx.drawImage(
          //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          this.image,
          (this.image.width / 12) * this.index[0],
          (this.image.height / 8) * this.index[1],
          this.image.width / 12,
          this.image.height / 8,
          this.x,
          this.y,
          this.size[0],
          this.size[1]
        );
      } else if (this.direction === "a") {
        this.ctx.drawImage(
          //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          this.image,
          (this.image.width / 12) * this.index[0],
          (this.image.height / 8) * (this.index[1] + 1),
          this.image.width / 12,
          this.image.height / 8,
          this.x,
          this.y,
          this.size[0],
          this.size[1]
        );
      } else if (this.direction === "d") {
        this.ctx.drawImage(
          //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          this.image,
          (this.image.width / 12) * this.index[0],
          (this.image.height / 8) * (this.index[1] + 2),
          this.image.width / 12,
          this.image.height / 8,
          this.x,
          this.y,
          this.size[0],
          this.size[1]
        );
      }
    }
  }

  takeDamage(attack) {
    this.health -= attack;
  }
}
