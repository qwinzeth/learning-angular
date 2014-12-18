'use strict';
roboexploreApp.Controllers
    .controller('worldCtrl', [
        '$scope',
        function worldCtrl($scope) {
			$scope.finishLeft = 18;
			$scope.finishTop = 18;
            $scope.tileRows = [];
			$scope.robots = [{color: 'black'}, {color: 'red', isai: true}]
			for(var i = 0; i < $scope.robots.length; i++){
				$scope.robots[i].time = 0;
			}
			
			for(var i = 0; i < 20; i++){
				$scope.tileRows[i] = [];
				for(var j = 0; j < 20; j++){
					if(i >=9 && i <= 11 && j <=2){
						$scope.tileRows[i][j] = {elevation: -1};
					}else if(Math.abs(i - j) <= 1){
						if(i < 13){
							$scope.tileRows[i][j] = {elevation: i};
						}else{
							$scope.tileRows[i][j] = {elevation: 12};
						}
					}else{
						$scope.tileRows[i][j] = {elevation: 0};
					}
				}
			}
        }
    ]);
