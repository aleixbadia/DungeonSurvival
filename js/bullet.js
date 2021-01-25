"use strict";
class Bullet {
  constructor(canvas, x, y, attack, direction) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.size = 50;
    this.image = document.getElementById("bullet");
    this.attack = attack;
    this.direction = direction;
    this.speed = 7;
  }

  draw() {
    this.ctx.drawImage(
      //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.x,
      this.y,
      this.size,
      this.size
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
    const bulletBottom = this.y + this.size;
    const bulletLeft = this.x;
    const bulletRight = this.x + this.size;

    if (bulletBottom > screenBottom || bulletTop < screenTop || bulletRight > screenRight || bulletLeft < screenLeft) {
      return true;
    } else {
      return false;
    }
  }
}
