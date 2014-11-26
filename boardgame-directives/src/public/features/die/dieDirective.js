directivesApp
    .Directives
    .directive('gameDie',
        function dieDirective() {
            'use strict';
			
			function link(scope, element, attr){
				scope.model.value = 1 + Math.floor(scope.model.sides * Math.random());
			}

            return {
                restrict: 'E',
                scope: {
					model: '=',
				},
                templateUrl: 'features/die/die-partial.html',
				link: link
            };
        }
	);
