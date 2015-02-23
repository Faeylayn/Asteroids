if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = function (shipVel, shipPos, game) {
  this.game = game
  this.velx = shipVel[0] * 2
  this.vely = shipVel[1] * 2
  this.vel = [this.velx, this.vely]
  this.xpos = shipPos[0]
  this.ypos = shipPos[1]
  this.radius = 5
  this.color = "#00FF00"
}

Asteroids.Util.inherits(movingObject, Bullet);
