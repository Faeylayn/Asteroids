(function() {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}
var GameView = Asteroids.GameView = function(asteroidCanvas, game) {
  this.game = game
  this.ctx = asteroidCanvas.getContext("2d");
};

GameView.prototype.start = function() {
  ctx = this.ctx
  window.setInterval((function (ctx) {
       this.moveObjects();
       this.draw(ctx);
     }).bind(this.game, ctx), 20);
   };

}) ()
