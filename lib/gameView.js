(function() {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}
var GameView = Asteroids.GameView = function(asteroidCanvas, game) {
  this.game = game
  this.ctx = asteroidCanvas.getContext("2d");
};

GameView.prototype.start = function() {
  var ctx = this.ctx
  window.setInterval((function (ctx) {
       this.step(ctx);
     }).bind(this.game, ctx), 20);
   };

}) ()
