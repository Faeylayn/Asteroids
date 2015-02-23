var sum = function () {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total
}

Function.prototype.myBind = function (obj) {
  var func = this;
  var args = Array.prototype.slice.call(arguments, 1)
  return function () {
    for (var j = 0; j < arguments.length; j++){
      args.push(arguments[j]);
    }
    func.apply(obj, args)
  }
}



//
// function curriedSum(numArgs) {
//   var numbers = [];
//   var _curriedSum = function (num) {
//     numbers.push(num);
//     if (numbers.length === numArgs){
//       var total = 0;
//       for (var i = 0; i < numArgs; i++) {
//         total += arguments[i];
//       }
//       return total;
//     } else {
//       return _curriedSum;
//     }
//   }
//   return _curriedSum;
// }

Function.prototype.curry = function (numArgs) {
  var args = [];
  var func = this;
  var argumentFunc = function (arg) {
    args.push(arg);
    if (args.length === numArgs){
      return func.apply(func, args);
    } else {
      return argumentFunc;
    }
  }
return argumentFunc;
}


Function.prototype.inherits = function (baseClass) {
  function Surrogate() {};
  Surrogate.prototype = baseClass.prototype;
  this.prototype = new Surrogate();

}
