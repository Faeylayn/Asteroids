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
    this.asteroids.push(new Asteroid(startPosition[0], startPosition[1]))
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

}) ()
