'use strict';
roboexploreApp.Services.factory('RobotAI', function RobotAI($window){
	return {
		moveSomewhere: moveSomewhere
	};
	
	function moveSomewhere($scope, delay){
		var debug = false;
		var POINTS_ILLEGAL = -100000000;
		var POINTS_CLOSER = 10;

		var finishTop = $scope.$parent.$parent.finishTop;
		var finishLeft = $scope.$parent.$parent.finishLeft;

		var points = [0, 0, 0, 0];
		if(!$scope.canMoveTo($scope.top + 1, $scope.left)){
			points[2] = POINTS_ILLEGAL;
		}
		if(!$scope.canMoveTo($scope.top - 1, $scope.left)){
			points[0] = POINTS_ILLEGAL;
		}
		if(!$scope.canMoveTo($scope.top, $scope.left + 1)){
			points[1] = POINTS_ILLEGAL;
		}
		if(!$scope.canMoveTo($scope.top, $scope.left - 1)){
			points[3] = POINTS_ILLEGAL;
		}

		if($scope.top < finishTop && points[2] != POINTS_ILLEGAL){
			points[2] += POINTS_CLOSER;
		}
		if($scope.top > finishTop && points[0] != POINTS_ILLEGAL){
			points[0] += POINTS_CLOSER;
		}
		if($scope.left < finishLeft && points[1] != POINTS_ILLEGAL){
			points[1] += POINTS_CLOSER;
		}
		if($scope.left > finishLeft && points[3] != POINTS_ILLEGAL){
			points[3] += POINTS_CLOSER;
		}
		
		var bestPoints = [0];
		for(var i = 1; i < points.length; i++){
			if(points[i] > points[bestPoints[0]]){
				bestPoints = [i];
			}else if(points[i] == points[bestPoints[0]]){
				bestPoints.push(i);
			}
		}
		
		if(debug){
			console.log('points', points, 'bestPoints', bestPoints);
		}
		
		var chosenDirection = bestPoints[Math.floor(Math.random() * bestPoints.length)];
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
		
		if($scope.top == finishTop && $scope.left == finishLeft){
			console.log("FINISH!");
			return;
		}
		$window.setTimeout(function(){
			moveSomewhere($scope, delay);
			$scope.$apply();
		}, delay);
	}
});
