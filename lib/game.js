(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function (dimx, dimy, numAsteroids) {
  this.DIM_X = dimx;
  this.DIM_Y = dimy;
  this.numAsteroids = numAsteroids;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Asteroids.Ship(this);
  this.bullets = [];
  this.lives = 5;
  this.GameOver = false;
  this.points = 0;
  this.rapidfire = null;
  setTimeout(function() {this.rapidfire = new Asteroids.PowerUp(this)}.bind(this), 100)
};

Game.RAPID_FIRE = "#FE2E2E"
Game.TRISHOT_COLOR = "#05B6D8"
Game.FIRE_SPEED = 250
Game.DEFAULT_COLOR = "#FFFFFF"
// Game.DEFAULT_RADIUS = Math.sqrt((((this.DIM_X * this.DIM_Y)/4)/this.numAsteroids)/Math.PI)
Game.DEFAULT_RADIUS = 50
Game.SHIPCOLOR = "#FE2E2E"
Game.SHIPRADIUS = 15

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < this.numAsteroids; i ++) {
    var startPosition = Asteroids.Util.randomPosition(this.DIM_X, this.DIM_Y)
    this.asteroids.push(new Asteroid(startPosition[0], startPosition[1], this, 3, 40))
  };
};

Game.prototype.allObjects = function() {
  var newArray = this.asteroids.slice(0);
  newArray.push(this.ship);
  newArray = newArray.concat(this.bullets);
  return newArray;
};

Game.prototype.PlayerObjs = function () {
  var newArr = [this.ship]
  newArr = newArr.concat(this.bullets)
  return newArr
}

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  var allObjs = this.allObjects()

  for (var i = 0; i < allObjs.length; i ++) {
    allObjs[i].draw(ctx);
  };

  if (this.rapidfire) {
    this.rapidfire.draw(ctx)
  }
};

Game.prototype.moveObjects = function () {
  var allObjs = this.allObjects()
  for (var i = 0; i < allObjs.length; i ++) {
    allObjs[i].move();
  };
};

Game.prototype.wrap = function (posx, posy, radius) {
  if (posx > this.DIM_X + radius) {
    posx -= this.DIM_X + radius
  }
  if (posy > this.DIM_Y + radius) {
    posy -= this.DIM_Y + radius
  }
  if (posx < 0 - radius) {
    posx += this.DIM_X + radius
  }
  if (posy < 0 - radius) {
    posy += this.DIM_Y + radius
  }
  return [posx, posy]
};

Game.prototype.checkCollisions = function () {
  var playerObjs = this.PlayerObjs()
  for (var i = 0; i < this.asteroids.length; i++){
    for (var j = 0; j < playerObjs.length; j++){
      if (this.asteroids[i].IsCollidedWith(playerObjs[j])){
        if (playerObjs[j] instanceof Ship && playerObjs[j].invuln === false ){
          this.lives -= 1
          if (this.lives < 1) {
            clearInterval(window.interval)
            $(".game-canvas").prepend("<strong class='you-win'> </strong>")
            $(".you-win").html("<h1 class='text'>YOU LOSE!<br></h1>")
            $(".text").append("<button class='new-game'>New Game!</button>")
          }
          playerObjs[j].relocate()

        } else if (playerObjs[j] instanceof Bullet) {
          this.points += 1
          this.handleAsteroid(i)
          this.removeBullet(j-1)
        }
      }
    }
  }
  if (this.rapidfire){
    if (this.ship.IsCollidedWith(this.rapidfire)) {
      if (this.rapidfire.class === "rapidfire") {
      this.ship.firespeed = 50
      setTimeout (function() {this.ship.firespeed = 250}.bind(this), 5000)
      this.rapidfire = null;
      setTimeout(function() {this.rapidfire = new Asteroids.PowerUp(this)}.bind(this), 20000)
    } else {
      this.ship.trishot = true
      setTimeout (function() {this.ship.trishot = false}.bind(this), 5000)
      this.rapidfire = null;
      setTimeout(function() {this.rapidfire = new Asteroids.PowerUp(this)}.bind(this), 20000)

    }
    }

}
};

Game.prototype.step = function (ctx) {
  this.moveObjects();
  this.checkCollisions();
  this.draw(ctx);
  this.ship.drawNose(ctx);
  if (this.asteroids.length === 0) {
    $(".game-canvas").prepend("<strong class='you-win'> </strong>")
    $(".you-win").html("<h1 class='text'>YOU ARE A WINNER!<br></h1>")
    clearInterval(window.interval)
    $(".text").append("<button class='new-game'>New Game!</button>")
  }
}



Game.prototype.handleAsteroid = function (index) {
  if (this.asteroids[index].size > 1) {
    var dyingAsteroid = this.asteroids[index];
    this.remove(index);
    this.asteroids.push(new Asteroid(dyingAsteroid.xpos, dyingAsteroid.ypos, this, dyingAsteroid.size - 1, dyingAsteroid.radius / 2));
    this.asteroids.push(new Asteroid(dyingAsteroid.xpos, dyingAsteroid.ypos, this, dyingAsteroid.size - 1, dyingAsteroid.radius / 2));
  } else {
    this.remove(index);
  }
};

Game.prototype.remove = function (index) {
  var newArr = this.asteroids.slice(0, index)
  var second = this.asteroids.slice(index + 1, this.asteroids.length)
  this.asteroids = newArr.concat(second)
}

Game.prototype.removeBullet = function (index) {
  var newArr = this.bullets.slice(0, index)
  var second = this.bullets.slice(index + 1, this.bullets.length)
  this.bullets = newArr.concat(second)

}
}) ()
