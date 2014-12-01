'use strict';

directivesApp.Controllers
    .controller('boardCtrl', [
        '$scope', '$window',
        function boardCtrl($scope, $window) {
			var tileSize = 50;
		
			$scope.requireChoice = false;
		
			$scope.tiles = [
				{type: 'start', top: '0', left: '0', next: []},
				{type: 'normal', top: '10', left: '50', next: []},
				{type: 'normal', top: '30', left: '100', next: []},
				{type: 'move-again', top: '50', left: '150', next: []},
				
					{type: 'move-again', top: '30', left: '200', next: []},
					{type: 'normal', top: '30', left: '250', next: []},
					{type: 'move-again', top: '30', left: '300', next: []},
					{type: 'normal', top: '30', left: '350', next: []},
					{type: 'move-again', top: '30', left: '400', next: []},

					{type: 'normal', top: '90', left: '200', next: []},
					{type: 'normal', top: '100', left: '250', next: []},
					{type: 'skip-turn', top: '110', left: '300', next: []},
					{type: 'normal', top: '130', left: '350', next: []},
					{type: 'normal', top: '150', left: '400', next: []},
					{type: 'normal', top: '160', left: '450', next: []},

						{type: 'skip-turn', top: '110', left: '475', next: []},
						{type: 'skip-turn', top: '60', left: '490', next: []},
						{type: 'finish', top: '10', left: '500', next: []},
						
						{type: 'move-again', top: '200', left: '500', next: []},
						{type: 'skip-turn', top: '200', left: '550', next: []},
						{type: 'normal', top: '200', left: '600', next: []}
			];

			for(var t = 0; t < 8; t++){
				$scope.tiles[t].next.push($scope.tiles[t + 1]);
			}
			for(var t = 9; t < 17; t++){
				$scope.tiles[t].next.push($scope.tiles[t + 1]);
			}
			for(var t = 18; t < $scope.tiles.length - 1; t++){
				$scope.tiles[t].next.push($scope.tiles[t + 1]);
			}
			$scope.tiles[3].next.push($scope.tiles[9]);
			$scope.tiles[8].next.push($scope.tiles[0]);
			
			$scope.tiles[14].next.push($scope.tiles[18]);
			$scope.tiles[17].next.push($scope.tiles[0]);
			$scope.tiles[$scope.tiles.length - 1].next.push($scope.tiles[0]);

			$scope.players = [];
			var colors = ['#FF0000', '#00FF00', '#00FFFF'];
			var playerCount = 3;
			for(var p = 0; p < playerCount; p++){
				$scope.players.push({
					name: 1 + p,
					tile: $scope.tiles[0],
					color: colors[p],
					skipTurns: 0
				});
			}
			for(var p = 0; p < playerCount - 1; p++){
				$scope.players[p].next = $scope.players[p + 1];
			}
			$scope.players[playerCount - 1].next = $scope.players[0];

			$scope.currentPlayer = $scope.players[0];
			
			adjustPlayersOnSameTiles();
			
			$scope.dice = [
				{sides: 6, value: 0},
				{sides: 6, value: 0}
			];
			
			$scope.movesRemaining = '';
			
			$scope.movePlayerTo = movePlayerTo;
			$scope.choosePath = choosePath;

			function movePlayerTo(player, newtile){				
				player.tile = newtile;
				adjustPlayersOnSameTiles();
			}
			
			$scope.rollDice = function rollDice(){
				if($scope.movesRemaining != '' && $scope.movesRemaining != 0){
					return;
				}

				$scope.movesRemaining = -1;
				
				var total = 0;
				_.each($scope.dice, function(die){
					die.value = 1 + Math.floor(die.sides * Math.random());
					total += parseInt(die.value);
				});
				
				$scope.movesRemaining = total;
				
				$window.setTimeout(autostepPlayer, 700);
			}
			
			function adjustPlayersOnSameTiles(){
				var tilemaps = [];
				for(var i = 0; i < $scope.players.length; i++){
					var ctile = $scope.players[i].tile;
					var tilemapIndex = -1;
					for(var j = 0; tilemapIndex === -1 && j < tilemaps.length; j++){
						if(tilemaps[j].tile === ctile){
							tilemapIndex = j;
						}
					}
					
					if(tilemapIndex === -1){
						tilemaps.push({tile: ctile, playerIDs: [i]});
					}else{
						tilemaps[tilemapIndex].playerIDs.push(i);
					}
				}
				
				for(var i = 0; i < tilemaps.length; i++){
					var ctile = tilemaps[i].tile;
					var pcount = tilemaps[i].playerIDs.length;
					for(var ptindex = 0; ptindex < tilemaps[i].playerIDs.length; ptindex++){
						var pindex = tilemaps[i].playerIDs[ptindex];
						
						$scope.players[pindex].left =
							parseInt(ctile.left) + (ptindex % 4) * 10 + 'px';
						$scope.players[pindex].top = parseInt(ctile.top) + parseInt(ptindex / 4) * 10 + 20 + 'px';
					}
				}
			}
			
			function autostepPlayer(){
				if($scope.currentPlayer.tile.next.length == 1){
					moveAndContinue($scope.currentPlayer.tile.next[0]);
				}else if($scope.currentPlayer.tile.next.length == 0){
					$scope.movesRemaining = 0;
					advanceCurrentPlayer();
				}else{
					$scope.requireChoice = true;
				}

				$scope.$apply();
			}
			
			function choosePath(chosenTile){
				if(!$scope.requireChoice
				|| -1 === _.indexOf($scope.currentPlayer.tile.next, chosenTile)){
					return;
				}
				
				$scope.requireChoice = false;
				moveAndContinue(chosenTile);
			}
			
			function moveAndContinue(tile){
				movePlayerTo($scope.currentPlayer, tile);
				$scope.movesRemaining--;
				if($scope.movesRemaining > 0){
					$window.setTimeout(autostepPlayer, 700);
				}else{
					if($scope.currentPlayer.tile.type !== 'move-again'){
						if($scope.currentPlayer.tile.type === 'skip-turn'){
							$scope.currentPlayer.skipTurns++;
						}
						advanceCurrentPlayer();
					}
				}
			}
			
			function advanceCurrentPlayer(){
				$scope.currentPlayer = $scope.currentPlayer.next;
				while($scope.currentPlayer.skipTurns > 0){
					$scope.currentPlayer.skipTurns--;
					$scope.currentPlayer = $scope.currentPlayer.next;
				}
			}
		}
	]);