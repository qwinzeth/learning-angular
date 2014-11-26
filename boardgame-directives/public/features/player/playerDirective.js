directivesApp
    .Directives
    .directive('player',
        function playerDirective() {
            'use strict';
			
            return {
                restrict: 'E',
                scope: {
                    color: '@',
					top: '@',
					left: '@',
					name: '@'
				},
                templateUrl: 'features/player/player-partial.html'
            };
        }
	);
