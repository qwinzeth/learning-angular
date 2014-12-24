treasurehuntApp.Controllers
    .controller('treasurefieldCtrl', [
        '$scope',
        function treasurefieldCtrl($scope) {
		'use strict';
			var treasureFieldData = generateTreasureField(20, 20);
			function revealFunction(row, col){
				return function reveal(evt, reactid){
					$('[data-reactid="' + reactid + '"]').html(treasureFieldData[row][col].value);
				};
			}

			function generateTreasureField(width, height){
				var field = [];
				for(var row = 0; row < height; row++){
					field[row] = [];
					for(var col = 0; col < width; col++){
						field[row][col] = {
							row: row,
							col: col,
							value: Math.floor(Math.random() * 10),
							displayChar: '?'
						};
					}
				}
				
				return field;
			}
			
			function toReactTreasureFieldRow(treasureFieldRow, index){
				function toReactTreasureBrick(treasureBrick){
					return React.createElement('div', {
						key: 'uniqueTreasureRow' + treasureBrick.row + 'Col' + treasureBrick.col,
						className: 'treasure-brick',
						onClick: revealFunction(treasureBrick.row, treasureBrick.col)
					}, treasureBrick.displayChar);
				}
				
				return React.createElement('div', {className: 'treasure-row', key: 'uniqueTreasureRow' + index}, _.map(treasureFieldRow, toReactTreasureBrick));
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
		}
	]);
