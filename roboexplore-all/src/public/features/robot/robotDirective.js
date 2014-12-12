'use strict'

roboexploreApp
    .Directives
    .directive('robot',
        function robotDirective() {
			function setPosition(scope, element, attrs){
				scope.top = 0;
				scope.topPixels = '0px';
				scope.left = 0;
				scope.leftPixels = '0px';
			}
			
            return {
                restrict: 'E',
                templateUrl: 'features/robot/robot-partial.html',
                controller: 'robotCtrl',
				link: setPosition
            };
        }
	);
