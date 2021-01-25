"use strict";

class Monster extends Creature {
    updatePosition(player, monsters){
        let collidedMonster;
        const monstersClean = monsters.filter(monster => monster !== this);
        let collision = false; //with other monsters
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

    outOfScreen(){
        const screenTop = 0;
        const screenBottom = this.canvas.height;
        const screenLeft = 0;
        const screenRight = this.canvas.width;
      
        const monsterTop = this.y;
        const monsterBottom = this.y + this.size[1];
        const monsterLeft = this.x;
        const monsterRight = this.x + this.size[0];
    
        if (monsterBottom > screenBottom || monsterTop < screenTop || monsterRight > screenRight || monsterLeft < screenLeft) {
          return true;
        } else {
          return false;
        }
      }

    
  }