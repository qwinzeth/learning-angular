directivesApp
    .Directives
    .directive('tile',
        function tileDirective() {
            'use strict';
			
			function setPosition(scope, element, attr){
				element.css({
					top: attr['top'] + 'px',
					left: attr['left'] + 'px'
				});
			}
			
            return {
                restrict: 'E',
                scope: {
                    type: '@'
				},
                templateUrl: 'features/tile/tile-partial.html',
                controller: 'tileCtrl',
				link: setPosition
            };
        }
	);
