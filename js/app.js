var app = angular.module('clickerApp', []);

app.factory('ClockFactory', function($interval) {
  var factory = {},
  	CF = this;
    time = {
      days: 0,
      hours: 7,
      minutes: 30,
      seconds: 0
    };
  CF.tick = 100;
  factory.time = time;
  CF.clock = function() {
    if (time.seconds == 59) {
      time.seconds = 0;
      if (time.minutes == 59) {
        time.minutes = 0;
        if (time.hours == 23) {
          time.hours = 0;
          time.days += 1;
        } else {
          time.hours += 1;
        }
      } else {
        time.minutes += 1;
      }
    } else {
      time.seconds += 1;
    }
    factory.time = time;
  };
  // Game timer
  this.timer = $interval(CF.clock, CF.tick);

  return factory;
});

app.controller('ClockController', ['$scope', 'ClockFactory',
  function($scope, ClockFactory) {
  	$scope.time = ClockFactory.time;
  }
]);
app.controller('MainController', ['$scope', '$interval', 'ClockFactory',
  function($scope, $interval, ClockFactory) {
    var MC = $scope;
    $scope.time = ClockFactory.time;

    $scope.trees = 0;
    $scope.treePrice = 10;

    $scope.houses = 0;
    $scope.houseCost = 20;

    $scope.beds = 0;
    $scope.bedForWorkers = function(amount) {
      if (!amount) { amount = 1;}
      if ($scope.money >= $scope.workerCost * amount && $scope.beds >= amount) {
        return true;
      } else {
        return false;
      }
    };

    $scope.workers = 0;
    $scope.workerCost = 100;
    $scope.work = function() {
    	// if ($scope.time.hours > 7 && time.hours < 18) {
    	if ($scope.money < 5 * $scope.workers && $scope.workers > 0) {
    		$scope.workers -= 1;
    		$scope.beds += 1;
    	} else {
    		$scope.money -= 5 * $scope.workers;
    		$scope.trees += $scope.workers;
    	}
    };
    this.workersWorking = $interval($scope.work, 1000);
    $scope.money = 0;
    $scope.increment = function(resource, amount) {
      if (!amount) {
        amount = 1;
      }
      if (resource == 'money') {
        $scope.trees -= 1 * amount;
        amount *= $scope.treePrice;
      }
      if (resource == 'workers') {
        $scope.money -= 100 * amount;
        $scope.beds -= 1 * amount;
      }
      if (resource == 'houses') {
        $scope.trees -= $scope.houseCost * amount;
        $scope.beds += 4 * amount;
      }
      $scope[resource] += amount;
    };
    $scope.upgrades = {
      x10 : {
        trees: false
      }
    };
    $scope.upgrade = function(upgrade, multiplier, resource, cost) {
      $scope.upgrades[multiplier][upgrade] = true;
      $scope[resource] -= cost;
    };
  }
]);