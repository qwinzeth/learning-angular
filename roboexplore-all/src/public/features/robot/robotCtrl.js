'use strict';
roboexploreApp.Controllers
    .controller('robotCtrl', [
        '$scope', 'RobotAI',
        function robotCtrl($scope, RobotAI) {
            function updatePosition(newTop, newLeft){
				var newtime = $scope.$parent.robot.time;

				if(!$scope.canMoveTo(newTop, newLeft)){
					return;
				}
				
				var elevationChange =  getElevationChange(newTop, newLeft);
				if(elevationChange == 1){
					newtime += .5;
				}
				newtime += Math.abs($scope.top - newTop) + Math.abs($scope.left - newLeft);
				$scope.$parent.robot.time = newtime;
				$scope.top = newTop;
				$scope.topPixels = newTop * 20 + 'px';
				$scope.left = newLeft;
				$scope.leftPixels = newLeft * 20 + 'px';
			}
			
			function getElevationChange(newTop, newLeft){
				return $scope.$parent.tileRows[newTop][newLeft].elevation - $scope.$parent.tileRows[$scope.top][$scope.left].elevation;
			}
			
			$scope.canMoveTo = function canMoveTo(newTop, newLeft){
				if(newTop < 0 || newTop >= $scope.$parent.tileRows.length || newLeft < 0 || newLeft >= $scope.$parent.tileRows.length){
					return false;
				}

				var elevationChange = getElevationChange(newTop, newLeft);
				if(elevationChange > 1){
					return false;
				}
				
				return true;
			}
			
			$scope.moveRight = function moveRight(rightDelta){
				updatePosition($scope.top, $scope.left + parseInt(rightDelta));
			}

			$scope.moveDown = function moveDown(downDelta){
				updatePosition($scope.top + parseInt(downDelta), $scope.left);
			}

			$scope.top = 0;
			$scope.topPixels = '0px';
			$scope.left = 0;
			$scope.leftPixels = '0px';
			if($scope.isai){
				RobotAI.moveSomewhere($scope, 1000);
			}
		}
    ]);
