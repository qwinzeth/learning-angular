roboexploreApp
    .Directives
    .directive('tile',
        function tileDirective() {
		'use strict';
            return {
                restrict: 'E',
                scope: {
					elevation: '@'
				},
                templateUrl: 'features/tile/tile-partial.html'
            };
        }
	);
