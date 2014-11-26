'use strict';

directivesApp.Controllers
    .controller('tileCtrl', [
        '$scope',
        function tileCtrl($scope) {
			switch($scope.type){
			case 'move-again':
				$scope.text = 'Again';
			break;
			case 'normal':
				$scope.text = '';
			break;
			case 'start':
				$scope.text = 'Start';
			break;
			default:
				$scope.text = $scope.type;
			break;
			}
        }
    ]);