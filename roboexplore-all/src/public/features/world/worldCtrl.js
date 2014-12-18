'use strict';
roboexploreApp.Controllers
    .controller('worldCtrl', [
        '$scope',
        function worldCtrl($scope) {
			$scope.maxElevation = 12;
			$scope.worldWidth = 20;
			$scope.worldHeight = 20;
			$scope.finishLeft = 18;
			$scope.finishTop = 18;
            $scope.tileRows = [];
			
			function reset(){
				$scope.robots = [{color: 'black'}, {color: 'red', isai: true}]
				for(var i = 0; i < $scope.robots.length; i++){
					$scope.robots[i].time = 0;
					$scope.robots[i].finish = false;
				}
			}
			reset();
			
			var currentLevel = -1;
			
			currentLevel++;
			$scope.tileRows[currentLevel] = [];
			for(var i = 0; i < $scope.worldHeight; i++){
				$scope.tileRows[currentLevel][i] = [];
				for(var j = 0; j < $scope.worldWidth; j++){
					$scope.tileRows[currentLevel][i][j] = {elevation: Math.floor($scope.maxElevation * i / $scope.worldHeight)};
				}
			}

			currentLevel++;
			$scope.tileRows[currentLevel] = [];
			for(var i = 0; i < $scope.worldHeight; i++){
				$scope.tileRows[currentLevel][i] = [];
				for(var j = 0; j < $scope.worldWidth; j++){
					var celev = 1;
					if(i == 6 && j >= 3 && j <= 15){
						celev = 10;
					}
					$scope.tileRows[currentLevel][i][j] = {elevation: celev};
				}
			}

			currentLevel++;
			$scope.tileRows[currentLevel] = [];
			for(var i = 0; i < $scope.worldHeight; i++){
				$scope.tileRows[currentLevel][i] = [];
				for(var j = 0; j < $scope.worldWidth; j++){
					var celev = 0;
					if(i >= 4 && i <= 10 && j == 14){
						celev = 12;
					}else if(i == 10 && j >= 4 && j <= 13){
						celev = 12;
					}
					$scope.tileRows[currentLevel][i][j] = {elevation: celev};
				}
			}

			currentLevel++;
			$scope.tileRows[currentLevel] = [];
			for(var i = 0; i < $scope.worldHeight; i++){
				$scope.tileRows[currentLevel][i] = [];
				for(var j = 0; j < $scope.worldWidth; j++){
					if(i >=9 && i <= 11 && j <=2){
						$scope.tileRows[currentLevel][i][j] = {elevation: -1};
					}else if(Math.abs(i - j) <= 1){
						if(i < 13){
							$scope.tileRows[currentLevel][i][j] = {elevation: i};
						}else{
							$scope.tileRows[currentLevel][i][j] = {elevation: $scope.maxElevation};
						}
					}else{
						$scope.tileRows[currentLevel][i][j] = {elevation: 0};
					}
				}
			}
			
			$scope.currentTileRows = 2;
			$scope.getVisibleTile = function getVisibleTile(top, left){
				return $scope.tileRows[$scope.currentTileRows][top][left];
			}
			
			$scope.loadNextLevel = function loadNextLevel(){
				$scope.currentTileRows++;
				reset();
			}
			
			$scope.hideNextButton = function hideNextButton(){
				var allRobotsFinished = true;
				for(var i = 0; allRobotsFinished && i < $scope.robots.length; i++){
					if(!$scope.robots[i].finish){
						allRobotsFinished = false;
					}
				}
				return $scope.currentTileRows == $scope.tileRows.length - 1
				|| !allRobotsFinished;
			}
        }
    ]);
