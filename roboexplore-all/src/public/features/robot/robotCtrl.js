'use strict';
roboexploreApp.Controllers
    .controller('robotCtrl', [
        '$scope',
        function robotCtrl($scope) {
            $scope.updatePosition = function updatePosition(newTop, newLeft){
				if(newTop < 0 || newTop >= $scope.tileRows.length || newLeft < 0 || newLeft >= $scope.tileRows.length){
					return;
				}

				var elevationChange = $scope.tileRows[newTop][newLeft].elevation - $scope.tileRows[$scope.top][$scope.left].elevation;
				if(elevationChange > 1){
					return;
				}else if(elevationChange == 1){
					$scope.time += .5;
				}

				$scope.time += Math.abs($scope.top - newTop) + Math.abs($scope.left - newLeft);
				$scope.top = newTop;
				$scope.topPixels = newTop * 20 + 'px';
				$scope.left = newLeft;
				$scope.leftPixels = newLeft * 20 + 'px';
			}
			
			$scope.moveRight = function moveRight(rightDelta){
				$scope.updatePosition($scope.top, $scope.left + parseInt(rightDelta));
			}

			$scope.moveDown = function moveDown(downDelta){
				$scope.updatePosition($scope.top + parseInt(downDelta), $scope.left);
			}
		}
    ]);
