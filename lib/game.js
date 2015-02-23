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
};

Game.DEFAULT_COLOR = "#00FF00"
// Game.DEFAULT_RADIUS = Math.sqrt((((this.DIM_X * this.DIM_Y)/4)/this.numAsteroids)/Math.PI)
Game.DEFAULT_RADIUS = 50
Game.prototype.addAsteroids = function() {
  for (var i = 0; i < this.numAsteroids; i ++) {
    var startPosition = Asteroids.Util.randomPosition(this.DIM_X, this.DIM_Y)
    this.asteroids.push(new Asteroid(startPosition[0], startPosition[1], this))
  };
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

  for (var i = 0; i < this.asteroids.length; i ++) {
    this.asteroids[i].draw(ctx);
  };
};

Game.prototype.moveObjects = function () {
  for (var i = 0; i < this.asteroids.length; i ++) {
    this.asteroids[i].move();
  };
};

Game.prototype.wrap = function (posx, posy) {
  if (posx > this.DIM_X) {
    posx -= this.DIM_X
  }
  if (posy > this.DIM_Y) {
    posy -= this.DIM_Y
  }
  if (posx < 0) {
    posx += this.DIM_X
  }
  if (posy < 0) {
    posy += this.DIM_Y
  }
  return [posx, posy]
};

Game.prototype.checkCollisions = function () {
  var collision = false
  for (var i = 0; i < this.asteroids.length; i++){
    for (var j = i + 1; j < this.asteroids.length; j++){
      if (this.asteroids[i].IsCollidedWith(this.asteroids[j])){
        this.remove(i);
        this.remove(j-1);
      }
    }
  }
}

Game.prototype.step = function (ctx) {
  this.moveObjects();
  this.checkCollisions();
  this.draw(ctx);
}

Game.prototype.remove = function (index) {
  var newArr = this.asteroids.slice(0, index)
  var second = this.asteroids.slice(index + 1, this.asteroids.length)
  this.asteroids = newArr.concat(second)
}

}) ()
