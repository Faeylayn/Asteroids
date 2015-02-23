if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var movingObject = function(xpos, ypos, vel, radius, color) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
};

movingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
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

movingObject.prototype.move = function() {
  this.xpos += this.vel[0];
  this.ypos += this.vel[1];

};
