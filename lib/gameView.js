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
  this.bindKeyHandlers()
  window.setInterval((function (ctx) {
       this.step(ctx);
     }).bind(this.game, ctx), 20);
   };

GameView.prototype.bindKeyHandlers = function () {
 key('up', function(){ this.game.ship.power('up') }.bind(this));
 key('down', function(){ this.game.ship.power('down') }.bind(this));
 key('left', function(){ this.game.ship.power('left') }.bind(this));
 key('right', function(){ this.game.ship.power('right') }.bind(this));
 key('space', function(){ this.game.ship.fire() }.bind(this));
}
}) ()
