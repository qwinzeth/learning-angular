treasurehuntApp.Controllers
    .controller('treasurefieldCtrl', [
        '$scope',
		function treasurefieldCtrl($scope) {
		'use strict';
			var TREASURE_TYPE_EMPTY =	0;
			var TREASURE_TYPE_WALL =	1;
			var TREASURE_TYPE_SILVER =	2;
			var TREASURE_TYPE_GOLD =	3;
			var TREASURE_TYPE_SAPPHIRE =4;
			var TREASURE_TYPE_EMERALD =	5;
			var TREASURE_TYPE_RUBY =	6;
			var TREASURE_TYPE_DIAMOND =	7;
			var hasBegun = false;
			var width = 20;
			var height = 20;
		
			var treasureFieldData = generateTreasureField();
			function clickHandleFunction(row, col){
				return function clickHandle(evt, reactid){
					if($scope.$parent.$parent.mode === 'normal'){
						reveal();
					}else if($scope.$parent.$parent.mode ==='wall-destruction'){
						wallDestroy();
					}else{
						console.log("Unknown mode: ", $scope.$parent.$parent.mode);
					}

					function wallDestroy(){
						var clickedTreasure = treasureFieldData[row][col];
						if(!clickedTreasure.revealed || clickedTreasure.value != TREASURE_TYPE_WALL){
							return;
						}
						var jqTreasure = $('[data-reactid="' + reactid + '"]');
						$scope.$parent.$parent.mode = 'normal';
						jqTreasure.removeClass('wall');
						jqTreasure.addClass('empty');
						jqTreasure.addClass('explored');
						jqTreasure.html('&nbsp;');
						clickedTreasure.revealed = true;
						clickedTreasure.value = TREASURE_TYPE_EMPTY;
						$scope.$parent.$parent.gold--;
						$scope.$parent.$parent.silver--;
					}
				
					function reveal(){
						function canMine(){
							if(!hasBegun){
								return row === 0 && col === 0;
							}
							
							var adjacentRevealed = false;
							if(row > 0)
								adjacentRevealed |= treasureFieldData[row - 1][col].revealed && treasureFieldData[row - 1][col].value != TREASURE_TYPE_WALL;
							if(col > 0)
								adjacentRevealed |= treasureFieldData[row][col - 1].revealed && treasureFieldData[row][col - 1].value != TREASURE_TYPE_WALL;
							if(row < height - 1)
								adjacentRevealed |= treasureFieldData[row + 1][col].revealed && treasureFieldData[row + 1][col].value != TREASURE_TYPE_WALL;
							if(col < width - 1)
								adjacentRevealed |= treasureFieldData[row][col + 1].revealed && treasureFieldData[row][col + 1].value != TREASURE_TYPE_WALL;
							
							return adjacentRevealed;
						}

						var clickedTreasure = treasureFieldData[row][col];
						if(clickedTreasure.revealed || !canMine()){
							return;
						}

						hasBegun = true;
						clickedTreasure.revealed = true;
						var jqTreasure = $('[data-reactid="' + reactid + '"]');
						
						var explored = true;
						switch(clickedTreasure.value){
						case TREASURE_TYPE_DIAMOND:
							$scope.$parent.$parent.diamonds++;
							jqTreasure.addClass('diamond');
							jqTreasure.html('D');
						break;
						case TREASURE_TYPE_RUBY:
							$scope.$parent.$parent.rubies++;
							jqTreasure.addClass('ruby');
							jqTreasure.html('R');
						break;
						case TREASURE_TYPE_EMERALD:
							$scope.$parent.$parent.emeralds++;
							jqTreasure.addClass('emerald');
							jqTreasure.html('E');
						break;
						case TREASURE_TYPE_SAPPHIRE:
							$scope.$parent.$parent.sapphires++;
							jqTreasure.addClass('sapphire');
							jqTreasure.html('S');
						break;
						case TREASURE_TYPE_GOLD:
							$scope.$parent.$parent.gold++;
							jqTreasure.addClass('gold');
							jqTreasure.html('g');
						break;
						case TREASURE_TYPE_SILVER:
							$scope.$parent.$parent.silver++;
							jqTreasure.addClass('silver');
							jqTreasure.html('s');
						break;
						case TREASURE_TYPE_EMPTY:
							jqTreasure.addClass('empty');
							jqTreasure.html('&nbsp;');
						break;
						case TREASURE_TYPE_WALL:
							explored = false;
							jqTreasure.addClass('wall');
							jqTreasure.html('X');
						break;
						default:
							console.log("UNKNOWN TREASURE TYPE: ", clickedTreasure.value);
						break;
						}

						if(explored){
							jqTreasure.addClass('explored');
						}

					}
					$scope.$apply();
				};
			}

			function generateTreasureField(){
				var field = [];
				var col, row, d100;
				for(row = 0; row < height; row++){
					field[row] = [];
					for(col = 0; col < width; col++){
						d100 = Math.floor(Math.random() * 100);
						var treasureValue = -1;
						if(d100 >= 98)
							treasureValue = TREASURE_TYPE_DIAMOND;
						else if(d100 >= 94)
							treasureValue = TREASURE_TYPE_RUBY;
						else if(d100 >= 90)
							treasureValue = TREASURE_TYPE_EMERALD;
						else if(d100 >= 86)
							treasureValue = TREASURE_TYPE_SAPPHIRE;
						else if(d100 >= 81)
							treasureValue = TREASURE_TYPE_GOLD;
						else if(d100 >= 75)
							treasureValue = TREASURE_TYPE_SILVER;
						else if(d100 >= 20)
							treasureValue = TREASURE_TYPE_WALL;
						else
							treasureValue = TREASURE_TYPE_EMPTY;
						
						field[row][col] = {
							row: row,
							col: col,
							value: treasureValue,
							displayChar: '?',
							revealed: false
						};
					}					
				}
				
				row = 0;
				col = 0;
				while(row != height - 1 || col != width - 1){
					field[row][col].value = TREASURE_TYPE_EMPTY;
					d100 = Math.floor(Math.random() * 100);
					if(d100 >= 95 && row > 0)
						row--;
					else if(d100 >= 90 && col > 0)
						col--;
					else if(d100 >= 45 && row < height - 1)
						row++;
					else if(col < width - 1)
						col++;
				}
				field[height - 1][width - 1].value = TREASURE_TYPE_EMPTY;
				
				return field;
			}
			
			function toReactTreasureFieldRow(treasureFieldRow, index){
				function toReactTreasureBrick(treasureBrick){
					return React.createElement('div', {
						key: 'uniqueTreasureRow' + treasureBrick.row + 'Col' + treasureBrick.col,
						className: 'treasure-brick',
						onClick: clickHandleFunction(treasureBrick.row, treasureBrick.col)
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
