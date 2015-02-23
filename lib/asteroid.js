var Asteroid = function (xpos, ypos, game) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.color = Asteroids.Game.DEFAULT_COLOR;
  this.radius = Asteroids.Game.DEFAULT_RADIUS;
  this.vel = Asteroids.Util.randomVec(2);
  this.game = game
};

Asteroids.Util.inherits(movingObject, Asteroid);
