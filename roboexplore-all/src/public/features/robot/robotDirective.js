'use strict'

roboexploreApp
    .Directives
    .directive('robot',
        function robotDirective() {
			function setPosition(scope, element, attrs){
				scope.updatePosition(0, 0);
			}
			
            return {
                restrict: 'E',
                templateUrl: 'features/robot/robot-partial.html',
                controller: 'robotCtrl',
				link: setPosition
            };
        }
	);
