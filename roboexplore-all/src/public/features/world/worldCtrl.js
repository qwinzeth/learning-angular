'use strict';
roboexploreApp.Controllers
    .controller('worldCtrl', [
        '$scope',
        function worldCtrl($scope) {
			$scope.finishLeft = 18;
			$scope.finishTop = 18;
            $scope.tileRows = [];
			$scope.time = 0;
			for(var i = 0; i < 20; i++){
				$scope.tileRows[i] = [];
				for(var j = 0; j < 20; j++){
					if(i >=9 && i <= 11 && j <=2){
						$scope.tileRows[i][j] = {elevation: -1};
					}else if(Math.abs(i - j) <= 1 && i < 13){
						$scope.tileRows[i][j] = {elevation: i};
					}else{
						$scope.tileRows[i][j] = {elevation: 0};
					}
				}
			}
        }
    ]);
