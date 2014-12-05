'use strict';
roboexploreApp.Controllers
    .controller('worldCtrl', [
        '$scope',
        function worldCtrl($scope) {
            $scope.tileRows = [];
			for(var i = 0; i < 20; i++){
				$scope.tileRows[i] = [];
				for(var j = 0; j < 20; j++){
					if(i >=9 && i <= 11 && j <=2){
						$scope.tileRows[i][j] = {elevation: -1};
					}else{
						$scope.tileRows[i][j] = {elevation: parseInt(i / 3 + j / 3)};
					}
				}
			}
        }
    ]);
