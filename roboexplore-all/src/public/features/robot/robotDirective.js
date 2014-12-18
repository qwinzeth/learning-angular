'use strict'

roboexploreApp
    .Directives
    .directive('robot',
        function robotDirective() {
            return {
                restrict: 'E',
                templateUrl: 'features/robot/robot-partial.html',
                controller: 'robotCtrl',
				scope: {
					isai: '@',
					color: '@',
					robotid: '@'
				}
            };
        }
	);
