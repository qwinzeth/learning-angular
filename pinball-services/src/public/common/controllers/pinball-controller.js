var width = 330;
var height = 500;

pinballApp.Controllers.controller("pinballCtrl", function filtersCtrl($scope, $window, physics){
	$scope.machineWidth = width;
	$scope.machineHeight = height;
	$scope.score = 0;
	$scope.highScore = 0;
	var pinballStartX = width - 15;
	var pinballStartY = 200;
	$scope.pinballs = [physics.newCircle(pinballStartX, pinballStartY, 10)];
	$scope.walls = [[
		physics.newLine(30, 230, 60, 240),	
		physics.newLine(240, 240, 270, 230),	
	
		physics.newLine(0, 340, 70, 390),
		physics.newLine(230, 390, 300, 340),
		physics.newLine(width - 31, 0, width, 30)
	], [
		physics.newLine(0, 340, 70, 390),
		physics.newLine(230, 390, 300, 340),
		physics.newLine(width - 31, 0, width, 30)
	]];

	$scope.bumpers = [[
		physics.newRect(140, 220, 20, 20),
		physics.newRect(80, 140, 20, 20),
		physics.newRect(200, 140, 20, 20),
		physics.newRect(20, 80, 20, 20),
		physics.newRect(140, 80, 20, 20),

		physics.newRect(width - 33, 80, 3, height - 80)
	], [
		physics.newRect(40, 40, 5, 20),
		physics.newRect(80, 40, 5, 20),
		physics.newRect(120, 40, 5, 20),
		physics.newRect(160, 40, 5, 20),
		physics.newRect(200, 40, 5, 20),

		physics.newRect(60, 120, 5, 20),
		physics.newRect(100, 120, 5, 20),
		physics.newRect(140, 120, 5, 20),
		physics.newRect(180, 120, 5, 20),
		physics.newRect(220, 120, 5, 20),

		physics.newRect(width - 33, 80, 3, height - 80)
	]];

	$scope.teleporters = [[
		physics.newRect(width - 10, 0, 10, 10, pinballStartX, pinballStartY)
	], [
		physics.newRect(260, 240, 10, 10, 120, 0),

		physics.newRect(width - 10, 0, 10, 10, pinballStartX, pinballStartY)
	]];
	
	$scope.levels = [];
	$scope.maxLevel = $scope.walls.length;
	for(var i = 0; i < $scope.maxLevel; i++){
		$scope.levels.push({name: i + 1, index: i});
	}
	$scope.level = $scope.levels[0];
	
	$scope.leftFlippers = [physics.newFlipper(70, 400, 125, 420)];
	$scope.rightFlippers = [physics.newFlipper(175, 420, 230, 400)];

	$scope.launcher = physics.newRect(width - 30, height - 10, 30, 10);
	var launcherAsWall = {
		x1: $scope.launcher.x,
		y1: $scope.launcher.y,
		x2: $scope.launcher.x + $scope.launcher.width,
		y2: $scope.launcher.y + $scope.launcher.height
	};
	
	$scope.autoLaunch = false;
	
	$scope.handleKey = function handleKey(evt){
		switch(evt.keyCode){
		case 90: //'Z'
			_.each($scope.leftFlippers, function(flipper){
				_.each($scope.pinballs, function(pinball){
					var biggerBall = physics.newCircle(pinball.x, pinball.y, pinball.r + 2);
					if(physics.boxCollision(biggerBall, flipper, 33)){
						pinball.yspd = 10 * (pinball.x - flipper.x1) / (flipper.x2 - flipper.x1) - 30;
						pinball.xspd = 35 + pinball.yspd;
						pinball.xacc = 0;
					}else{
						console.log("LEFT: ("+pinball.x+","+pinball.y+") not in ("+flipper.x1+","+flipper.y1+") => ("+flipper.x2+","+flipper.y2+")");
					}
				});
			});
			handleLaunchers();
		break;
		case 88: //'X'
			_.each($scope.rightFlippers, function(flipper){
				_.each($scope.pinballs, function(pinball){
					var biggerBall = physics.newCircle(pinball.x, pinball.y, pinball.r + 2);
					if(physics.lineCollision(biggerBall, flipper, 33)){
						pinball.yspd = 10 * (flipper.x2 - pinball.x) / (flipper.x2 - flipper.x1) - 30;
						pinball.xspd = -35 - pinball.yspd;
						pinball.xacc = 0;
					}else{
						console.log("RIGHT: ("+pinball.x+","+pinball.y+") not in ("+flipper.x1+","+flipper.y1+") => ("+flipper.x2+","+flipper.y2+")");
					}
				});
			});
			handleLaunchers();
		break;
		case 190:
			$scope.resetGame();
		break;
		default:
			console.log(evt.keyCode);
		break;
		}
	};
	
	function handleLaunchers(){
		_.each($scope.pinballs, function(pinball){
			if(physics.boxCollision(pinball, launcherAsWall, 33)){
				pinball.yspd = -30;
			}
		});
	}
	
	$scope.resetGame = function resetGame(){
		$scope.score = 0;
		_.each($scope.pinballs, function(pinball){
			pinball.x = pinballStartX;
			pinball.y = pinballStartY;
		});
	}
	
	angular.element(document).ready(docReady);

	function docReady(){
		$window.setInterval(step, 33);

		var oldts = new Date().valueOf();
		function step(){
			var cts = new Date().valueOf();
			var elapsedMilliseconds = cts - oldts;
			var allWalls = $scope.walls[$scope.level.index].concat($scope.leftFlippers).concat($scope.rightFlippers);
			_.each($scope.pinballs, function(pinball){
				physics.applyGravity(pinball, elapsedMilliseconds);
				physics.applyMovement(pinball, elapsedMilliseconds);
				$scope.score += physics.handleCollisions(pinball, allWalls, $scope.teleporters[$scope.level.index], $scope.bumpers[$scope.level.index], elapsedMilliseconds);
				if($scope.score > $scope.highScore){
					$scope.highScore = $scope.score;
				}
				if($scope.autoLaunch){
					if(physics.boxCollision(pinball, launcherAsWall, elapsedMilliseconds)){
						pinball.yspd = -30;
					}
				}
			});
			
			oldts = cts;
			$scope.$apply();
		}
	}
});

