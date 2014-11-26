'use strict';

directivesApp.Controllers
    .controller('boardCtrl', [
        '$scope',
        function boardCtrl($scope) {
			var tileSize = 50;
			var currentPlayerID = 0;
		
			$scope.tiles = [
				{type: 'start', top: '0', left: '0'},
				{type: 'normal', top: '10', left: '50'},
				{type: 'normal', top: '30', left: '100'},
				{type: 'move-again', top: '50', left: '150'}
			];

			$scope.players = [
				{tileID: 0, color: '#FF0000'},
				{tileID: 0, color: '#00FF00'},
				{tileID: 0, color: '#0000FF'},
				{tileID: 0, color: '#00FFFF'},
				{tileID: 0, color: '#FFFF00'},
				{tileID: 0, color: '#FF00FF'},
				{tileID: 0, color: '#CCCCCC'},
				{tileID: 0, color: '#009900'}
			];
			
			adjustPlayersOnSameTiles();
			
			$scope.movePlayerTo = function movePlayerTo(tileID){
				var tile = $scope.tiles[tileID];
				var player = $scope.players[currentPlayerID];
				
				player.tileID = tileID;
				
				adjustPlayersOnSameTiles();
				currentPlayerID = (currentPlayerID + 1) % $scope.players.length;
			}
			
			function adjustPlayersOnSameTiles(){
				var tileIDs = [];
				for(var i = 0; i < $scope.players.length; i++){
					var ctileid = $scope.players[i].tileID;
					var tileIDIndex = -1;
					for(var j = 0; tileIDIndex == -1 && j < tileIDs.length; j++){
						if(tileIDs[j].id == ctileid){
							tileIDIndex = j;
						}
					}
					
					if(tileIDIndex == -1){
						tileIDs.push({id: ctileid, playerIDs: [i]});
					}else{
						tileIDs[tileIDIndex].playerIDs.push(i);
					}
				}
				
				for(var i = 0; i < tileIDs.length; i++){
					var ctileid = tileIDs[i].id;
					var pcount = tileIDs[i].playerIDs.length;
					for(var ptindex = 0; ptindex < tileIDs[i].playerIDs.length; ptindex++){
						var pindex = tileIDs[i].playerIDs[ptindex];
						
						$scope.players[pindex].left =
							parseInt($scope.tiles[ctileid].left) + (ptindex % 4) * 10 + 'px';
						$scope.players[pindex].top = parseInt($scope.tiles[ctileid].top) + parseInt(ptindex / 4) * 10 + 20 + 'px';
					}
				}
			}
		}
	]);