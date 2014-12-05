'use strict'

roboexploreApp
    .Directives
    .directive('tile',
        function tileDirective() {
            return {
                restrict: 'E',
                scope: {
					elevation: '@'
				},
                templateUrl: 'features/tile/tile-partial.html'
            };
        }
	);
