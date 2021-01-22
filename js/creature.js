"use strict";

class Creature {
  constructor(canvas, health, attack, speed, x, y, color) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.size = 50;
    this.color = color;

    this.health = health;
    this.attack = attack;
    this.speed = speed;
  }

  didCollide(element) {
    const playerLeft = this.x;
    const playerRight = this.x + this.size;
    const playerTop = this.y;
    const playerBottom = this.y + this.size;

    const elementLeft = element.x;
    const elementRight = element.x + element.size;
    const elementTop = element.y;
    const elementBottom = element.y + element.size;

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
    this.ctx.fillStyle = this.color;
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  takeDamage(attack) {
    this.lives -= attack;
  }
}
