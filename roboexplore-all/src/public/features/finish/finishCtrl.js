roboexploreApp.Controllers
    .controller('finishCtrl', [
        '$scope',
        function finishCtrl($scope) {
			'use strict';
            $scope.updatePosition = function updatePosition(newTop, newLeft){
				$scope.top = newTop;
				$scope.topPixels = newTop * 20 + 'px';
				$scope.left = newLeft;
				$scope.leftPixels = newLeft * 20 + 'px';
			};
			
			$scope.moveRight = function moveRight(rightDelta){
				$scope.updatePosition($scope.top, $scope.left + parseInt(rightDelta));
			};

			$scope.moveDown = function moveDown(downDelta){
				$scope.updatePosition($scope.top + parseInt(downDelta), $scope.left);
			};
		}
    ]);
