if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

Asteroids.Util = {}

Asteroids.Util.inherits = function (baseClass, subClass) {
  function Surrogate() {};
  Surrogate.prototype = baseClass.prototype;
  subClass.prototype = new Surrogate();
};

Asteroids.Util.randomVec = function(length) {
  var xpos = Math.random() * length;
  var ypos = Math.sqrt((length * length) - (xpos * xpos))
  return [xpos, ypos]
}

Asteroids.Util.randomPosition = function(xdim, ydim) {
  var xpos = Math.random() * xdim;
  var ypos = Math.random() * ydim;

  return [xpos, ypos];
};
