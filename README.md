# DUNGEON SURVIVAL

## Description

Dungeon Survival is a game where your character will have to survive several rounds of monsters that will try to kill. Each round will finish when all monsters have been defeated.

## MVP (DOM - CANVAS)

_CANVAS_, The mvp is a game where at least one player can move around the map and one monster follows him.

## Backlog

- if the character collides with a monsters, you get hurt
- the character can shoot
- more than one monsterat the first round
- Sprites (1 player, 1 monster)
- 2 tipes of weapons
- weapons have limited ammo
- Infinite rounds with ammo reset
- Each round with more monsters each time
- Sprites (2 players, 2 monsters)
- No ammo reset, but mosters drop ammo you can collect
- Sprites (3 players, 3 monsters)
- 2 players
- Sprites (4 players, 4 monsters)
- Every 5 rounds, a super monster apears
- diferent maps for each round

## Data structure

## main.js - States y States Transitions

```
- splashScreen1()
  - buildSplash1()
  - addEventListener(splashScreen2) - if Name is introduced

- splashScreen2()
  - destroySplash1()
  - buildSplash2()
  - addEventListener(splashScreen3)

- splashScreen3()
  - destroySplash2()
  - buildSplash3()
  - addEventListener(startGame)

- starGame()
  - destroySplash3()
  - destroyGameOver() - if gameOver exists
  - create new Game()
  - game.start()

- gameOver()
  - destroyGame()
  - buildGameOver()
  - addEventListener(startGame)
```

### game.js

```
class Game {
  constructor(){
    this.canvas;
    this.ctx;
    this.player; - if there is 2 players this will be an array
    this.enemy[];
    this.bullet[];
    this.gameOver;
    this.score;
  }

  start(){
  }

  startLoop(){
  loop()
  }

  updateAllPositions(){ - with handle of the screen collision
  }

  updateCanvas(){
  }

  updateGameStats() {
  }

  createMonsters(){
  }

  checkAllCollisons(){ - monsters to players and bullets to monsters (and 2nd player)
  }
}


```

### creature.js

```
class Creature {
  constructor(canvas, health, damage) {
    this.canvas;
    this.ctx;
    this.x;
    this.y;
    this.size;

    this.health;
    this.attack;
    this.speed;
  }

  updatePosition(){ - with handle of the screen collision
  }

  didCollide(enemy){
  }

  draw(){
  }

  takeDamage(attack){
  }
}


```

### player.js

```

class Player extends Creature {
  shoot(){
  }
}


```

### bullet.js

```
class Bullet(){
  constructor(attack){
    this.canvas;
    this.ctx;
    this.x;
    this.y;
    this.size;

    this.attack;
  }
  
  draw(){
  }
}




```


## Task - WIP

- Main - buildDom
- Main - buildSplash
- Main - addEventListener
- Main - destroySplash
- Main - 3 states transitions
- Game - loop
- Game - Create Player,rock and wall
- Main - GameWon
- Main - destroy Game
- Main - GameWon RESTART
- Main - removeGameWon
- Game - restartGame
- Game - addEventListener
- Wall - create
- Player - create
- Player - move
- Player - collision
- Rock - create
- Rock - throw (physics)
- Rock - collision
- Game - check win

## Links

### Trello

[Link url](https://trello.com/b/7AltuuZb/stone-fight-kanban)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/zebader/Stone-Fight)
[Link Deploy]()

### Slides

URls for the project presentation (slides)
[Link Slides.com]()
