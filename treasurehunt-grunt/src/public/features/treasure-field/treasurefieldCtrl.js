treasurehuntApp.Controllers
    .controller('treasurefieldCtrl', [
        '$scope',
        function treasurefieldCtrl($scope) {
		'use strict';
			function generateTreasureField(width, height){
				var field = [];
				for(var row = 0; row < height; row++){
					field[row] = [];
					for(var col = 0; col < width; col++){
						field[row][col] = {
							displayChar: '?'
						};
					}
				}
				
				return field;
			}
			
			var treasureFieldData = generateTreasureField(20, 20);

			function toReactTreasureFieldRow(treasureFieldRow){
				function toReactTreasureBrick(treasureBrick){
					return React.createElement('div', {key: 'uniqueKey' + Math.random(), className: 'treasure-brick'}, treasureBrick.displayChar);
				}
				
				return React.createElement('div', {className: 'treasure-row'}, _.map(treasureFieldRow, toReactTreasureBrick));
			}
			
			var TreasureField = React.createClass({
				displayName: 'TreasureField',
				render: function(){
					return (React.createElement('div', null, 
						_.chain(treasureFieldData).map(toReactTreasureFieldRow).value())
					);
				}
			});
			
			React.render(
				React.createElement(TreasureField, null),
				document.getElementById('divTreasureField')
			);
			
			console.log('Hello?');
			$scope.LOGMSG = 'HELLO?!';
		}
	]);
