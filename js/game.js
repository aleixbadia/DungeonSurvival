'use strict';

function Game(canvas){
  this.player = null;
  this.rock = null;
  this.wall = null;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.gameOver = false;
  this.backgroundXspeed = 0;
  this.turn = 1;
  this.finalVectorPos = null;
}

//Add initial elements and events ----------

Game.prototype.start = function(){
  this.backgroundImg = new Image();
  this.backgroundImg.src = "./img/clouds.png";

  this.backgroundImg2 = new Image();
  this.backgroundImg2.src = "./img/mountainsbg.png";

  this.hitAudio = new Audio('./sounds/hit.mp3');
  this.hitrockAudio = new Audio('./sounds/hitrock.mp3');
  this.fallingkrockAudio = new Audio('./sounds/fallingrock.mp3');


  this.player = new Player(this.canvas,this.canvas.width/5);
  this.player2 = new Player(this.canvas,3.7*this.canvas.width/5);
  this.rock = new Rock(this.canvas);
  this.wall = new Wall(this.canvas);

//Event listeners ----------

  this.newMovement= this.playerMovement.bind(this);
  this.stopMovement = this.playerStopMovement.bind(this);
  this.newInitialPos = this.setThrowValues.bind(this);
  this.newFinalPos = this.throwRock.bind(this);
  this.drawHandlerLine = this.setCursorPosition.bind(this);

  document.addEventListener('keydown', this.newMovement);
  this.canvas.addEventListener('mousedown',  this.newInitialPos);
  this.canvas.addEventListener('mouseup', this.newFinalPos);
  document.addEventListener('keyup', this.stopMovement);
  this.canvas.removeEventListener('click',  this.newInitialPos);
};

//Star game loop ----------

Game.prototype.startLoop = function(){
  const loop = () => {
    this.clearCanvas();
    this.updateCanvas();
    this.drawCanvas();
    this.checkCollision();
    if (this.gameOver === false){
      window.requestAnimationFrame(loop);
    }
  }
  window.requestAnimationFrame(loop);
};

//Game methods ----------

Game.prototype.clearCanvas = function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

Game.prototype.updateCanvas = function(){
  this.player.updateXPosition();
  this.player2.updateXPosition();
  if (this.turn % 2 !== 0) {
    if (this.player2.wasHit) {
      this.player2.spritePos = 2;      
    } 
    else if(this.player.wasHit) {
      this.player.spritePos = 2;      
    } 
    else {
      this.rock.setPositionStart(this.player.updateXPosition()+this.player.size/2-this.rock.size/2,this.player.y - this.rock.size/2);
      this.player.spritePos = 1;
      this.player2.spritePos = 0;
    }
  } 
  else {
    if (this.player.wasHit) {
      this.player.spritePos = 2;      
    } 
    else if(this.player2.wasHit) {
      this.player2.spritePos = 2;      
    } 
    else {
      this.rock.setPositionStart(this.player2.updateXPosition()+this.player2.size/2-this.rock.size/2,this.player2.y - this.rock.size/2);
      this.player.spritePos = 0;
      this.player2.spritePos = 1;
    }
  }
  this.rock.updatePosition();

}

Game.prototype.drawCanvas = function(){
  this.drawBackground();
  this.player.draw("./img/player-sprite.png");
  this.player2.draw("./img/player2-sprite.png");
  this.player.drawLife(20,20,this.canvas.height/15);
  this.player2.drawLife(this.canvas.width - ((this.canvas.height/15)*3)-20,20,this.canvas.height/15);
  this.rock.draw();
  this.wall.draw();

  if(this.finalVectorPos){
    this.drawPowerLine();}
}

Game.prototype.drawBackground = function(){
  this.ctx.fillStyle= '#eddcbe';
  this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

  this.ctx.drawImage(this.backgroundImg,this.backgroundXspeed ,0);
  this.ctx.drawImage(this.backgroundImg, this.backgroundImg.width - Math.abs(this.backgroundXspeed),0);
  this.ctx.drawImage(this.backgroundImg, this.backgroundImg.width*2 - Math.abs(this.backgroundXspeed),0);

  if (Math.abs(this.backgroundXspeed) > this.backgroundImg.width) {
    this.backgroundXspeed = 0;
  }
  this.backgroundXspeed -= 0.2;

  this.ctx.drawImage(this.backgroundImg2,0,this.canvas.height - this.backgroundImg2.height);
  this.ctx.drawImage(this.backgroundImg2,this.backgroundImg2.width,this.canvas.height - this.backgroundImg2.height);
  this.ctx.drawImage(this.backgroundImg2,this.backgroundImg2.width*2,this.canvas.height - this.backgroundImg2.height);
}

Game.prototype.switchPlayerTurn = function(){
  this.rock = new Rock(this.canvas);
  this.rock.resetValues(this.player2.x);
  this.rock.x = 1000;
  this.turn ++;
  document.addEventListener('keydown', this.newMovement);
  this.canvas.addEventListener('mousedown',  this.newInitialPos);
  this.canvas.addEventListener('mouseup', this.newFinalPos);
}

Game.prototype.checkCollision = function(){
  if (this.rock.checkCollisionWithWall(this.wall)){
    this.fallingkrockAudio.pause();
    this.fallingkrockAudio.currentTime = 0;

    this.hitrockAudio.play();
    this.hitrockAudio = new Audio('./sounds/hitrock.mp3');

    this.switchPlayerTurn();
  }
  if (this.rock.checkCollisionWithPlayer(this.player2)){

    this.fallingkrockAudio.pause();
    this.fallingkrockAudio.currentTime = 0;

    this.hitAudio.play();
    this.hitrockAudio = new Audio('./sounds/hitrock.mp3');
    this.player2.lives--;
    this.player2.wasHit = true;

      this.switchPlayerTurn();
      if(this.player2.lives === 0){
        this.gameOver = true;
        this.onGameOver();
        
        var gameOverScreen = document.querySelector('.player-winner');
        gameOverScreen.setAttribute("src", "./img/player1-wins.png");
      }

      setTimeout(() => {
        this.player2.wasHit = false;
      }, 500)
  }
  if (this.rock.checkCollisionWithPlayer(this.player)){
    this.fallingkrockAudio.pause();
    this.fallingkrockAudio.currentTime = 0;
    this.hitAudio.play();
    this.hitrockAudio = new Audio('./sounds/hitrock.mp3');
    this.player.lives--
    this.player.wasHit = true;

    this.switchPlayerTurn();
    if(this.player.lives === 0){
      this.gameOver = true;
      this.onGameOver();

      var gameOverScreen = document.querySelector('.player-winner');
      gameOverScreen.setAttribute("src", "./img/player2-wins.png");
    }

    setTimeout(() => {
      this.player.wasHit = false;
    }, 500)
  }
  if (this.player.checkCollisionWithWall(this.wall)){
    this.player.x = this.wall.x - this.player.size;
  }
  if (this.player2.checkCollisionWithWall(this.wall)){
    this.player2.x = this.wall.x + this.wall.sizeX;
  }
  if(this.rock.y > this.canvas.height ){
    this.fallingkrockAudio.pause();
    this.fallingkrockAudio.currentTime = 0;
    this.hitrockAudio.play();
    this.hitrockAudio = new Audio('./sounds/hitrock.mp3');
    this.switchPlayerTurn();
  }
}

Game.prototype.setGameOverCallBack = function(callback){
  this.onGameOver = callback;
}

// Events methods ===========================================

Game.prototype.playerMovement = function(event){
  const key = event.keyCode;

  if(this.turn%2 !== 0){
    if(key === 37){
      this.player.setDirection(-1);
      this.player2.setDirection(0);
    }
    else if (key === 39){
      this.player.setDirection(1);
      this.player2.setDirection(0);
    }
  }
  else {
    if(key === 37){
      this.player.setDirection(0);
      this.player2.setDirection(-1);
    }
    else if (key === 39){
      this.player.setDirection(0);
      this.player2.setDirection(1);
    }
  }
}

Game.prototype.playerStopMovement = function(event){
  const key = event.keyCode;
  if(key !== 37 || key !== 39){
    this.player.setDirection(0)
    this.player2.setDirection(0)
  }
}

Game.prototype.setThrowValues = function(event){
  this.canvas.addEventListener('mousemove', this.drawHandlerLine);
  this.player.blockPlayer();
  document.removeEventListener('keydown', this.newMovement)
  this.rock.setThrowRockInitValues();
}

Game.prototype.throwRock = function(event){
  let final = this.finalVectorPos;

  if(final === null){
    this.rock.initialVector = [];
     return
  }

  this.canvas.removeEventListener('mousedown',  this.newInitialPos);
  this.canvas.removeEventListener('mouseup', this.newFinalPos);
  this.canvas.removeEventListener('mousemove', this.drawHandlerLine);
  this.rock.ifStart = true;
  this.rock.setDirection(1);
  this.fallingkrockAudio.pause();
  this.fallingkrockAudio.currentTime = 0;
  this.fallingkrockAudio.play();
  this.rock.setThrowRockValues();
  this.rock.initialVector = [];
  this.finalVectorPos = null;
}


Game.prototype.setCursorPosition = function(event){
  this.finalVectorPos = [event.offsetX,event.offsetY];
}

Game.prototype.drawPowerLine = function(){
  var setRadiusModule = [Math.abs(this.finalVectorPos[0] - this.rock.initialVector[0]),Math.abs(this.finalVectorPos[1] - this.rock.initialVector[1])];
  var powerRadius = Math.floor((Math.sqrt(Math.pow(setRadiusModule[0],2) + Math.pow(setRadiusModule[1],2))));

  this.ctx.beginPath();
  this.ctx.strokeStyle= '#522d31';
  this.ctx.lineWidth = 4;
  this.ctx.moveTo(this.rock.initialVector[0], this.rock.initialVector[1]);
  this.ctx.lineTo(this.finalVectorPos[0], this.finalVectorPos[1]);
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.strokeStyle= '#522d31';
  this.ctx.lineWidth = 1;
  this.ctx.arc(this.rock.initialVector[0], this.rock.initialVector[1], powerRadius, 0, 2 * Math.PI);
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.strokeStyle= '#a0c200';
  this.ctx.lineWidth = 15;
  this.ctx.arc(this.rock.initialVector[0], this.rock.initialVector[1], powerRadius+10, 0, (powerRadius/9)/(2 * Math.PI));
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.strokeStyle= '#86a30a';
  this.ctx.lineWidth = 7;
  this.ctx.arc(this.rock.initialVector[0], this.rock.initialVector[1], powerRadius+12, 0, (powerRadius/9)/(2 * Math.PI));
  this.ctx.stroke();
}
