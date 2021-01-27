"use strict";
class Bullet {
  constructor(canvas, x, y, attack, direction) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.size = [70, 70];
    this.image = document.getElementById("bullet");
    this.attack = attack;
    this.direction = direction;
    this.speed = 7;
  }

  draw() {
    this.image.style.transform = 'rotate(180deg)';
    this.ctx.drawImage(
      //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      this.image,
      this.image.width*0.1,
      this.image.height*0.1,
      this.image.width*0.8,
      this.image.height*0.8,
      this.x,
      this.y,
      this.size[0],
      this.size[1]
    );
  }

  updatePosition() {
    if (this.direction === "a") {
      this.x -= this.speed;
    } else if (this.direction === "d") {
      this.x += this.speed;
    } else if (this.direction === "w") {
      this.y -= this.speed;
    } else if (this.direction === "s") {
      this.y += this.speed;
    } else if (this.direction === "wa") {
      this.y -= this.speed / 2;
      this.x -= this.speed / 2;
    } else if (this.direction === "wd") {
      this.y -= this.speed / 2;
      this.x += this.speed / 2;
    } else if (this.direction === "sa") {
      this.y += this.speed / 2;
      this.x -= this.speed / 2;
    } else if (this.direction === "sd") {
      this.y += this.speed / 2;
      this.x += this.speed / 2;
    }
  }

  outOfScreen(){
    const screenTop = 0;
    const screenBottom = this.canvas.height;
    const screenLeft = 0;
    const screenRight = this.canvas.width;
  
    const bulletTop = this.y;
    const bulletBottom = this.y + this.size[1];
    const bulletLeft = this.x;
    const bulletRight = this.x + this.size[0];

    if (bulletBottom > screenBottom || bulletTop < screenTop || bulletRight > screenRight || bulletLeft < screenLeft) {
      return true;
    } else {
      return false;
    }
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
      creatureLeft <= elementRight && creatureLeft >= elementLeft;

    const crossRight =
      creatureRight <= elementRight && creatureRight >= elementLeft;

    const crossBottom =
      creatureBottom >= elementTop && creatureBottom <= elementBottom;

    const crossTop = creatureTop >= elementTop && creatureTop <= elementBottom;

    if (stop) {
      debugger;
    }

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    } else {
      return false;
    }
  }
}
