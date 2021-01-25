"use strict";

class Monster extends Creature {
    updatePosition(player, monsters){
        let collidedMonster;
        const monstersClean = monsters.filter(monster => monster !== this);
        let collision = false;
        monstersClean.forEach(monster => {
            if (this.didCollide(monster)) {
                collision = true;
                collidedMonster = monster;
            }
        });

        if (!collision) {
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
        } else {
            if (this.x>collidedMonster.x) {
                this.x += this.speed;
            }
            if (this.x<collidedMonster.x) {
                this.x -= this.speed;
            }
            if (this.y>collidedMonster.y) {
                this.y += this.speed;
            }
            if (this.y<collidedMonster.y) {
                this.y -= this.speed;
            }
        }
    }
  }