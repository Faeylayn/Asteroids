(function() {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}
var GameView = Asteroids.GameView = function(asteroidCanvas, game) {
  this.game = game;
  this.ctx = asteroidCanvas.getContext("2d");
  this.thrust = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  this.fire = false;
  this.pause = false;
  this.bindKeyHandlers();
};

GameView.prototype.drawStats = function () {
  $(".hud").empty();
  $(".hud").append("<li>Lives Left: " + this.game.lives + "</li>")
  $(".hud").append("<li>Points: " + this.game.points + "</li>")
  $(".hud").append("<li>Asteroids Left: " + this.game.asteroids.length + "</li>")
}


GameView.prototype.start = function() {

  var img = new Image();
  var ctx = this.ctx
  $(".you-win").remove()

  window.interval = setInterval((function () {
    if (this.pause === false) {
    ctx.drawImage(img, 0, 0)
    this.drawStats();
       this.AdjustThrust();
       this.game.step(ctx);
    }
     }).bind(this), 20);

   };

GameView.prototype.bindKeyHandlers = function () {
  $(document).keydown(function(event){
    event.preventDefault()
    this.parseKeycodeDown(event.keyCode)
  }.bind(this))

  $(document).keyup(function(event){
    event.preventDefault()
    this.parseKeycodeUp(event.keyCode)
  }.bind(this))

  $(".game-canvas").on("click", ".new-game", function (event) {
    var canvasEl = $("#game-canvas")
    canvasEl.empty()
    canvasEl.height = (window.innerHeight) * .99;
    canvasEl.width = (window.innerWidth) * .99;


    this.game = new Asteroids.Game(canvasEl.width, canvasEl.height, 10)
    this.start()
  }.bind(this))
}

GameView.prototype.parseKeycodeDown = function(keycode){

  // Move Up
  if(keycode === 38){
    this.thrust.up = true
  }
  // Move Down
  if(keycode === 40){
    this.thrust.down = true
  }
  // Move Left
  if(keycode === 37){
    this.thrust.left = true
  }
  // Move Right
  if(keycode === 39){
    this.thrust.right = true
  }

  if(keycode === 32){
    this.fire = true
  }

  if(keycode === 13){
    this.pause ? this.pause = false : this.pause = true

  }

}

GameView.prototype.parseKeycodeUp = function(keycode){

  // Move Up
  if(keycode === 38){
    this.thrust.up = false
  }
  // Move Down
  if(keycode === 40){
    this.thrust.down = false
  }
  // Move Left
  if(keycode === 37){
    this.thrust.left = false
  }
  // Move Right
  if(keycode === 39){
    this.thrust.right = false
  }
  if(keycode === 32){
    this.fire = false
  }
}

GameView.prototype.AdjustThrust = function () {

  if(this.thrust.up){
    this.game.ship.power('up')
  }
  // Move Down
  if(this.thrust.down){
    this.game.ship.power('down')
  }
  // Move Left
  if(this.thrust.left){
    this.game.ship.power('left')
  }
  // Move Right
  if(this.thrust.right){
    this.game.ship.power('right')
  }

  if(this.fire){
    this.game.ship.fire()
  }
}

}) ()
