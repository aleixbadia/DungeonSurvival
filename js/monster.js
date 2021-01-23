"use strict";

class Monster extends Creature {
    updatePosition(player){
        if (this.x>player.x) {
            this.x -= this.speed;
        }
        if (this.x<player.x) {
            this.x += this.speed;
        }
        if (this.y>player.y) {
            this.y -= this.speed;
        }
        if (this.y<player.y) {
            this.y += this.speed;
        }
    }
  }