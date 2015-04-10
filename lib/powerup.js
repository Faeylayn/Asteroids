var PowerUp = Asteroids.PowerUp = function (game) {
  this.game = game
  this.pos = Asteroids.Util.randomPosition(this.game.DIM_X, this.game.DIM_Y)
  this.xpos = this.pos[0]
  this.ypos = this.pos[1]
  this.radius = 10
  this.setclass()

}

PowerUp.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    5,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

PowerUp.prototype.setclass = function () {
  var selector = (Math.floor(Math.random() * 2))
  var classes = ["rapidfire", "trishot"]
  var colors = {"rapidfire": "#FE2E2E", "trishot": "#05B6D8"}
  this.class = classes[selector]
  this.color = colors[this.class]
}
