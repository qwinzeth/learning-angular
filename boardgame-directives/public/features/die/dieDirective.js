directivesApp
    .Directives
    .directive('gameDie',
        function dieDirective() {
            'use strict';
			
			function link(scope, element, attr){
				scope.value = 1 + Math.floor(scope.sides * Math.random());
			}

            return {
                restrict: 'E',
                scope: {
					sides: '@'
				},
                templateUrl: 'features/die/die-partial.html',
				link: link
            };
        }
	);
