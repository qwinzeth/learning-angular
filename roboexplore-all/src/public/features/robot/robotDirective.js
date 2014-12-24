roboexploreApp
    .Directives
    .directive('robot',
        function robotDirective() {
		'use strict';
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
