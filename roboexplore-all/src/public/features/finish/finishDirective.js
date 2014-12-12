'use strict'

roboexploreApp
    .Directives
    .directive('finish',
        function finishDirective() {
			function setPosition(scope, element, attrs){
				scope.updatePosition(scope.top, scope.left);
			}
			
            return {
                restrict: 'E',
                templateUrl: 'features/finish/finish-partial.html',
				scope: {
					left: '@',
					top: '@'
				},
                controller: 'finishCtrl',
				link: setPosition
            };
        }
	);
