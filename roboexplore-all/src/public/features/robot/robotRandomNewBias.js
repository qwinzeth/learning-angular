'use strict';
roboexploreApp.Services.factory('RobotAI', function RobotAI($window){
	return {
		moveSomewhere: moveSomewhere
	};
	
	function moveSomewhere($scope, delay){
		var debug = false;
		
		if($scope.previous === undefined){
			$scope.previous = [];
		}
		if(!_.find($scope.previous, function(prev){
			return $scope.top == prev.top && $scope.left == prev.left;
		})){
			$scope.previous.push({top: $scope.top, left: $scope.left});
		}

		var points = [0, 0, 0, 0];
		points[0] = getPointsForMove($scope, $scope.top - 1, $scope.left);
		points[1] = getPointsForMove($scope, $scope.top, $scope.left + 1);
		points[2] = getPointsForMove($scope, $scope.top + 1, $scope.left);
		points[3] = getPointsForMove($scope, $scope.top, $scope.left - 1);
		
		var bestPointsIndex = [0];
		for(var i = 1; i < points.length; i++){
			if(points[i] > points[bestPointsIndex[0]]){
				bestPointsIndex = [i];
			}else if(points[i] == points[bestPointsIndex[0]]){
				bestPointsIndex.push(i);
			}
		}
		
		if(debug){
			console.log('points', points, 'bestPointsIndex', bestPointsIndex);
		}
		
		var chosenDirection = bestPointsIndex[Math.floor(Math.random() * bestPointsIndex.length)];
		switch(chosenDirection){
		case 0:
			$scope.moveDown(-1);
		break;
		case 1:
			$scope.moveRight(1);
		break;
		case 2:
			$scope.moveDown(1);
		break;
		case 3:
			$scope.moveRight(-1);
		break;
		default:
			console.log("Unknown direction: ", chosenDirection);
		break;
		}
		
		var finishTop = $scope.$parent.$parent.finishTop;
		var finishLeft = $scope.$parent.$parent.finishLeft;

		if($scope.top == finishTop && $scope.left == finishLeft){
			console.log("FINISH!");
			return;
		}
		$window.setTimeout(function(){
			moveSomewhere($scope, delay);
			$scope.$apply();
		}, delay);
	}
	
	function getPointsForMove($scope, hypoTop, hypoLeft){
		var POINTS_ILLEGAL = -100000000;
		var POINTS_PREVIOUS = -100000;

		var finishTop = $scope.$parent.$parent.finishTop;
		var finishLeft = $scope.$parent.$parent.finishLeft;

		var hypoPoints = 0;
		if(!$scope.canMoveTo(hypoTop, hypoLeft)){
			hypoPoints += POINTS_ILLEGAL;
		}
		
		if(_.find($scope.previous, function(prev){
			return hypoTop == prev.top && hypoLeft == prev.left;
		})){
			hypoPoints += POINTS_PREVIOUS;
		}
		
		return hypoPoints;
	}
});
