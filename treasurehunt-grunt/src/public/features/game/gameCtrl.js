treasurehuntApp.Controllers
    .controller('gameCtrl', [
        '$scope',
        function gameCtrl($scope) {
		'use strict';
			$scope.diamonds = 0;
			$scope.rubies = 0;
			$scope.emeralds = 0;
			$scope.sapphires = 0;
			$scope.gold = 0;
			$scope.silver = 0;

			$scope.mode = 'normal';
			$scope.initiateWallDestructionMode = function initiateWallDestructionMode(){
				$scope.mode = 'wall-destruction';
			};
			
			$scope.initiateAdjacentWallDestructionMode = function initiateWallDestructionMode(){
				$scope.mode = 'wall-adjacent-destruction';
			};
			
			$scope.destroyWallVisible = function destroyWallVisible(){
				return $scope.silver > 0 && $scope.gold > 0 && $scope.mode === 'normal';
			};

			$scope.destroyAdjacentWallVisible = function destroyWallVisible(){
				return $scope.rubies > 0 && $scope.emeralds > 0 && $scope.sapphires > 0 && $scope.mode === 'normal';
			};
		}
	]);