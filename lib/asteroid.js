var Asteroid = function (xpos, ypos, game, size, radius) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.color = Asteroids.Game.DEFAULT_COLOR;
  this.radius = radius;
  this.vel = Asteroids.Util.randomVec(2);
  this.game = game;
  this.size = size;
  this.img = new Image();
  this.img.src = './lib/surface.jpg'
};

Asteroids.Util.inherits(movingObject, Asteroid);

Asteroid.prototype.draw = function (ctx) {
  // this.img = new Image();
  // this.img.src = './lib/surface.jpg'
  var ptrn = ctx.createPattern(this.img,'repeat');
  ctx.fillStyle = ptrn;
  ctx.beginPath();

  ctx.arc(
    this.xpos,
    this.ypos,
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};
