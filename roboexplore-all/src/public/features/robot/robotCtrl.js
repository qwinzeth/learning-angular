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
				
				if(!$scope.$parent.robot.finish){
					var elevationChange =  getElevationChange(newTop, newLeft);
					if(elevationChange == 1){
						newtime += .5;
					}
					newtime += Math.abs($scope.top - newTop) + Math.abs($scope.left - newLeft);
					$scope.$parent.robot.time = newtime;
				}
				$scope.top = newTop;
				$scope.topPixels = newTop * 20 + 'px';
				$scope.left = newLeft;
				$scope.leftPixels = newLeft * 20 + 'px';
				if($scope.top == $scope.$parent.$parent.finishTop && $scope.left == $scope.$parent.$parent.finishLeft){
					$scope.$parent.robot.finish = true;
				}
			}
			
			function getElevationChange(newTop, newLeft){
				return $scope.$parent.getVisibleTile(newTop, newLeft).elevation - $scope.$parent.getVisibleTile($scope.top, $scope.left).elevation;
			}
			
			$scope.canMoveTo = function canMoveTo(newTop, newLeft){
				if(newTop < 0 || newTop >= $scope.$parent.worldWidth || newLeft < 0 || newLeft >= $scope.$parent.worldHeight){
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
				RobotAI.moveSomewhere($scope, 500);
			}
		}
    ]);
