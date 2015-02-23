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
  this.bullets = []
};

Game.DEFAULT_COLOR = "#00FF00"
// Game.DEFAULT_RADIUS = Math.sqrt((((this.DIM_X * this.DIM_Y)/4)/this.numAsteroids)/Math.PI)
Game.DEFAULT_RADIUS = 50
Game.SHIPCOLOR = "#00FF00"
Game.SHIPRADIUS = 25

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < this.numAsteroids; i ++) {
    var startPosition = Asteroids.Util.randomPosition(this.DIM_X, this.DIM_Y)
    this.asteroids.push(new Asteroid(startPosition[0], startPosition[1], this))
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
};

Game.prototype.moveObjects = function () {
  var allObjs = this.allObjects()
  for (var i = 0; i < allObjs.length; i ++) {
    allObjs[i].move();
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
  var playerObjs = this.PlayerObjs()
  for (var i = 0; i < this.asteroids.length; i++){
    for (var j = 0; j < playerObjs.length; j++){
      if (this.asteroids[i].IsCollidedWith(playerObjs[j])){
        if (playerObjs[j] instanceof Ship){
          playerObjs[j].relocate()
        } else {
          this.remove(i)
          this.removeBullet(j-1)
        }
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

Game.prototype.removeBullet = function (index) {
  var newArr = this.bullets.slice(0, index)
  var second = this.bullets.slice(index + 1, this.bullets.length)
  this.bullets = newArr.concat(second)

}
}) ()