function uirouterController($scope, $state) {
	var gridSize = 10;
	var DIRECTION_NORTH = 0;
	var DIRECTION_EAST = 1;
	var DIRECTION_SOUTH = 2;
	var DIRECTION_WEST = 3;
	var BOAT_SIZES = [2, 3, 3, 4, 5];
	
	var mySetupBoatIndex = 0;
	var aiLastUnsunkCoordsArray = [];
	
	$scope.aiGrid = [];
	$scope.myGrid = [];
	$scope.rowHeaders = [];
	$scope.colHeaders = [];
	
	$scope.myCellClicked = myCellClicked;
	$scope.confirmMyBoat = confirmMyBoat;
	$scope.placeBoatsRandomly = placeBoatsRandomly;
	$scope.aiCellClicked = aiCellClicked;
	$scope.getAICellDisplayChar = getAICellDisplayChar;
	$scope.mySunkBoats = 0;
	$scope.aiSunkBoats = 0;
	
	angular.element(document).ready(setStartingState);
	
	for(var i = 0; i < gridSize; i++){
		$scope.aiGrid[i] = [];
		$scope.myGrid[i] = [];
		$scope.rowHeaders[i] = { Name: String.fromCharCode(65 + i) };
		$scope.colHeaders[i] = { Name: 1 + i };
		for(var j = 0; j < gridSize; j++){
			$scope.aiGrid[i][j] = { guessed: false, boat: false, sunk: false, displayChar: '.', x: j, y: i };
			$scope.myGrid[i][j] = { guessed: false, boat: false, sunk: false, displayChar: '.', x: j, y: i };
		}
	}
	
	placeBoatsRandomly($scope.aiGrid);
	
	function myCellClicked(cell){
		if(cell.boat || !$state.includes('newgame.place')){
			return;
		}
	
		var directions = getValidDirections($scope.myGrid, cell.x, cell.y, BOAT_SIZES[mySetupBoatIndex]);
		if(directions.length == 0){
			return;
		}
		
		putBoat($scope.myGrid, cell.x, cell.y, directions[0], BOAT_SIZES[mySetupBoatIndex]);
		
		$state.go('newgame.rotate');
	}
	
	function confirmMyBoat(){
		mySetupBoatIndex++;
		if(mySetupBoatIndex < BOAT_SIZES.length){
			$state.go('newgame.place');
		}else{
			$state.go('play');
		}
	}
		
	function getValidDirections(grid, boatX, boatY, boatSize){
		var directionOptions = [];
		if(boatY >= boatSize - 1){
			var validDirection = true;
			for(var j = 1; validDirection && j < boatSize; j++){
				if(grid[boatY - j][boatX].boat){
					validDirection = false;
				}
			}

			if(validDirection){
				directionOptions.push(DIRECTION_NORTH);
			}
		}

		if(boatY <= gridSize - boatSize){
			var validDirection = true;
			for(var j = 1; validDirection && j < boatSize; j++){
				if(grid[boatY + j][boatX].boat){
					validDirection = false;
				}
			}

			if(validDirection){
				directionOptions.push(DIRECTION_SOUTH);
			}
		}

		if(boatX >= boatSize - 1){
			var validDirection = true;
			for(var j = 1; validDirection && j < boatSize; j++){
				if(grid[boatY][boatX - j].boat){
					validDirection = false;
				}
			}

			if(validDirection){
				directionOptions.push(DIRECTION_WEST);
			}
		}

		if(boatX <= gridSize - boatSize){
			var validDirection = true;
			for(var j = 1; validDirection && j < boatSize; j++){
				if(grid[boatY][boatX + j].boat){
					validDirection = false;
				}
			}

			if(validDirection){
				directionOptions.push(DIRECTION_EAST);
			}
		}
		
		return directionOptions;
	}
	
	function putBoat(grid, boatX, boatY, direction, boatSize){
		grid[boatY][boatX].boat = true;
		if(direction == DIRECTION_NORTH){
			grid[boatY][boatX].displayChar = '\\/';
			for(var j = 1; j < boatSize; j++){
				var ccell = grid[boatY - j][boatX];
				ccell.boat = true;
				if(j < boatSize - 1){
					ccell.displayChar = '||';
				}else{
					ccell.displayChar = '/\\';
				}
			}
		}
		else if(direction == DIRECTION_EAST){
			grid[boatY][boatX].displayChar = '<';
			for(var j = 1; j < boatSize; j++){
				var ccell = grid[boatY][boatX + j]
				ccell.boat = true;
				if(j < boatSize - 1){
					ccell.displayChar = '=';
				}else{
					ccell.displayChar = '>';
				}
			}
		}
		else if(direction == DIRECTION_SOUTH){
			grid[boatY][boatX].displayChar = '/\\';
			for(var j = 1; j < boatSize; j++){
				var ccell = grid[boatY + j][boatX];
				ccell.boat = true;
				if(j < boatSize - 1){
					ccell.displayChar = '||';
				}else{
					ccell.displayChar = '\\/';
				}
			}
		}
		else{
			grid[boatY][boatX].displayChar = '>';
			for(var j = 1; j < boatSize; j++){
				var ccell = grid[boatY][boatX - j];
				ccell.boat = true;
				if(j < boatSize - 1){
					ccell.displayChar = '=';
				}else{
					ccell.displayChar = '<';
				}
			}
		}
	}

	function setStartingState(){
		$state.go('newgame.place');
	}

	function placeBoatsRandomly(grid){
		for(var i = mySetupBoatIndex; i < BOAT_SIZES.length; i++){
			var directionOptions = [];
			while(directionOptions.length == 0){
				var startingX = Math.floor(Math.random() * gridSize);
				var startingY = Math.floor(Math.random() * gridSize);
				if(grid[startingY][startingX].boat){
					continue;
				}
				
				directionOptions = getValidDirections(grid, startingX, startingY, BOAT_SIZES[i]);
			}
			
			var direction = directionOptions[Math.floor(Math.random() * directionOptions.length)];
			putBoat(grid, startingX, startingY, direction, BOAT_SIZES[i]);
		}
		
		if(grid === $scope.myGrid){
			$state.go('play');
		}
	}

	function aiCellClicked(cell){
		if(!$state.includes('play') || cell.guessed){
			return;
		}
		
		targetCell($scope.aiGrid, cell);
		
		var aiGuess = getAIGuess();
		var aiGuessY = aiGuess.y;
		var aiGuessX = aiGuess.x;
		targetCell($scope.myGrid, $scope.myGrid[aiGuessY][aiGuessX]);
		
		if($scope.myGrid[aiGuessY][aiGuessX].displayChar != '.'
		&& !$scope.myGrid[aiGuessY][aiGuessX].sunk){
			aiLastUnsunkCoordsArray.push({x: aiGuessX, y: aiGuessY});
		}
		
		function getAIGuess(){
			var aiGuessX = -1;
			var aiGuessY = -1;
			for(var aic = 0; aic < aiLastUnsunkCoordsArray.length; aic++){
				var aiLastUnsunkCoords = aiLastUnsunkCoordsArray[aic];
				if(!$scope.myGrid[aiLastUnsunkCoords.y][aiLastUnsunkCoords.x].sunk
				&& $scope.myGrid[aiLastUnsunkCoords.y][aiLastUnsunkCoords.x].guessed
				&& !$scope.myGrid[aiLastUnsunkCoords.y][aiLastUnsunkCoords.x].displayChar != '.'){
					potentialCoords = [];
					if(aiLastUnsunkCoords.y > 0){
						potentialCoords.push({x: aiLastUnsunkCoords.x, y: aiLastUnsunkCoords.y - 1})
					}
					if(aiLastUnsunkCoords.y < gridSize - 1){
						potentialCoords.push({x: aiLastUnsunkCoords.x, y: aiLastUnsunkCoords.y + 1})
					}
					if(aiLastUnsunkCoords.x > 0){
						potentialCoords.push({x: aiLastUnsunkCoords.x - 1, y: aiLastUnsunkCoords.y})
					}
					if(aiLastUnsunkCoords.x < gridSize - 1){
						potentialCoords.push({x: aiLastUnsunkCoords.x + 1, y: aiLastUnsunkCoords.y})
					}
					
					for(var pc = 0; pc < potentialCoords.length; pc++){
						if(!$scope.myGrid[potentialCoords[pc].y][potentialCoords[pc].x].guessed){
							aiGuessX = potentialCoords[pc].x;
							aiGuessY = potentialCoords[pc].y;
							break;
						}
					}
				}else{
					aiLastUnsunkCoordsArray.splice(aic--, 1);
				}
			}
			
			if(aiGuessX == -1 || aiGuessY == -1){
				aiGuessX = 2 * Math.floor(Math.random() * gridSize / 2);
				aiGuessY = Math.floor(Math.random() * gridSize);
				if(aiGuessY % 2 == 1){
					aiGuessX++;
				}
				while($scope.myGrid[aiGuessY][aiGuessX].guessed){
					aiGuessX = 2 * Math.floor(Math.random() * gridSize / 2);
					aiGuessY = Math.floor(Math.random() * gridSize);
					if(aiGuessY % 2 == 1){
						aiGuessX++;
					}
				}
			}
			return {x: aiGuessX, y: aiGuessY};
		}
		
		function targetCell(grid, cell){
			cell.guessed = true;
			if(cell.boat){
				if(cell.displayChar == '='){
					if(checkSunkLeft(grid, cell) && checkSunkRight(grid, cell)){
						cell.sunk = true;
						sinkLeft(grid, cell);
						sinkRight(grid, cell);
						boatSunk(grid);
					}
				}else if(cell.displayChar == '<'){
					if(checkSunkRight(grid, cell)){
						cell.sunk = true;
						sinkRight(grid, cell);
						boatSunk(grid);
					}
				}else if(cell.displayChar == '>'){
					if(checkSunkLeft(grid, cell)){
						cell.sunk = true;
						sinkLeft(grid, cell);
						boatSunk(grid);
					}
				}else if(cell.displayChar == '||'){
					if(checkSunkUp(grid, cell) && checkSunkDown(grid, cell)){
						cell.sunk = true;
						sinkUp(grid, cell);
						sinkDown(grid, cell);
						boatSunk(grid);
					}
				}else if(cell.displayChar == '/\\'){
					if(checkSunkDown(grid, cell)){
						cell.sunk = true;
						sinkDown(grid, cell);
						boatSunk(grid);
					}
				}else if(cell.displayChar == '\\/'){
					if(checkSunkUp(grid, cell)){
						cell.sunk = true;
						sinkUp(grid, cell);
						boatSunk(grid);
					}
				}
			}
			
			function checkSunkLeft(grid, cell){
				for(var leftX = cell.x - 1; grid[cell.y][leftX].displayChar != '<'; leftX--){
					if(!grid[cell.y][leftX].guessed){
						return false;
					}
				}
				if(!grid[cell.y][leftX].guessed){
					return false;
				}
				return true;
			}

			function checkSunkRight(grid, cell){
				for(var rightX = cell.x + 1; grid[cell.y][rightX].displayChar != '>'; rightX++){
					if(!grid[cell.y][rightX].guessed){
						return false;
					}
				}
				if(!grid[cell.y][rightX].guessed){
					return false;
				}
				return true;
			}
			
			function checkSunkUp(grid, cell){
				for(var upY = cell.y - 1; grid[upY][cell.x].displayChar != '/\\'; upY--){
					if(!grid[upY][cell.x].guessed){
						return false;
					}
				}
				if(!grid[upY][cell.x].guessed){
					return false;
				}
				return true;
			}

			function checkSunkDown(grid, cell){
				for(var downY = cell.y + 1; grid[downY][cell.x].displayChar != '\\/'; downY++){
					if(!grid[downY][cell.x].guessed){
						return false;
					}
				}
				if(!grid[downY][cell.x].guessed){
					return false;
				}
				return true;
			}
			
			function sinkLeft(grid, cell){
				for(var leftX = cell.x - 1; grid[cell.y][leftX].displayChar != '<'; leftX--){
					grid[cell.y][leftX].sunk = true;
				}
				grid[cell.y][leftX].sunk = true;
			}
			
			function sinkRight(grid, cell){
				for(var rightX = cell.x + 1; grid[cell.y][rightX].displayChar != '>'; rightX++){
					grid[cell.y][rightX].sunk = true;
				}
				grid[cell.y][rightX].sunk = true;
			}

			function sinkUp(grid, cell){
				for(var upY = cell.y - 1; grid[upY][cell.x].displayChar != '/\\'; upY--){
					grid[upY][cell.x].sunk = true;
				}
				grid[upY][cell.x].sunk = true;
			}
			
			function sinkDown(grid, cell){
				for(var downY = cell.y + 1; grid[downY][cell.x].displayChar != '\\/'; downY++){
					grid[downY][cell.x].sunk = true;
				}
				grid[downY][cell.x].sunk = true;
			}
			
			function boatSunk(grid){
				if(grid == $scope.myGrid){
					$scope.mySunkBoats++;
					if($scope.mySunkBoats >= BOAT_SIZES.length){
						$state.go('aiwin');
					}
				}else{
					$scope.aiSunkBoats++;
					if($scope.aiSunkBoats >= BOAT_SIZES.length){
						$state.go('mywin');
					}
				}
			}
		}
	}
	
	function getAICellDisplayChar(cell){
		if(!cell.sunk && !$state.includes('aiwin')){
			return '.';
		}
		return cell.displayChar;
	}
}

function uirouterConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/newgame/place")
	$stateProvider
		.state('newgame', {
			url: '/newgame',
			templateUrl: 'partials/newgame.html'
		}).state('newgame.place', {
			url: '/place',
			templateUrl: 'partials/newgame_place.html'
		}).state('newgame.rotate', {
			url: '/rotate',
			templateUrl: 'partials/newgame_rotate.html'
		}).state('play', {
			url: '/play',
			templateUrl: 'partials/play.html'
		}).state('mywin', {
			url: '/mywin',
			templateUrl: 'partials/mywin.html'
		}).state('aiwin', {
			url: '/aiwin',
			templateUrl: 'partials/aiwin.html'
		});
}

var uirouterApp = angular.module("uirouterApp", ['ui.router']);

uirouterApp.controller("UIRouterCtrl", uirouterController);
uirouterApp.config(uirouterConfig);
