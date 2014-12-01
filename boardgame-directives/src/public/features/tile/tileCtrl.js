'use strict';

directivesApp.Controllers
    .controller('tileCtrl', [
        '$scope',
        function tileCtrl($scope) {
			switch($scope.type){
			case 'move-again':
				$scope.text = 'Again';
			break;
			case 'skip-turn':
				$scope.text = 'Skip';
			break;
			case 'normal':
				$scope.text = '';
			break;
			case 'start':
				$scope.text = 'Start';
			break;
			case 'finish':
				$scope.text = 'Finish';
			break;
			default:
				$scope.text = $scope.type;
			break;
			}
        }
    ]);