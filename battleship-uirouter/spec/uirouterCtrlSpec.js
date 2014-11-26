/* Karma/Jasmine/AngularMock doesn't like uirouter...
	beforeEach(function(){
describe("uirouterCtrl", function(){
		angular.mock.module('uirouterApp', ['ui.router']);
	});

	it("should have a 10x10 aiGrid and myGrid, initialized with no guesses and x y coords", inject(function($rootScope, $controller, $state){
		var $scope = $rootScope.$new();
		var ctrl = $controller('UIRouterCtrl', {
			$scope: $scope,
			$state: $state
		});
		
		expect(checkGrid($scope.aiGrid)).toEqual(17);
		expect(checkGrid($scope.myGrid)).toEqual(0);

		function checkGrid(grid){
			var boatSquares = 0;
			expect(grid).toBeDefined();
			expect(grid.length).toEqual(10);
			for(var i = 0; i < 10; i++){
				expect(grid[i].length).toEqual(10);
				for(var j = 0; j < 10; j++){
					expect(grid[i][j].guessed).toEqual(false);
					expect(grid[i][j].x).toEqual(j);
					expect(grid[i][j].y).toEqual(i);
					if(grid[i][j].boat){
						boatSquares++;
					}
				}
			}
			return boatSquares
		}
	}));
	
	it("should place a boat from A1 to B1 when A1 is clicked", inject(function($rootScope, $controller){
		var $scope = $rootScope.$new();
		var ctrl = $controller('UIRouterCtrl', {
			$scope: $scope
		});
		
		expect($scope.myGrid[0][0].boat).toEqual(false);
		$scope.myCellClicked($scope.myGrid[0][0]);
		expect($scope.myGrid[0][0].boat).toEqual(true);
	}));
});
*/

describe('uirouterCtrl', function(){
	var $scope;
	var $state;
	beforeEach(function(){
		$scope = {};
		$state = {
			cstate: '',
			go: function(newstate){
				$state.cstate = newstate;
			},
			includes: function(state){
				return $state.cstate == state;
			}	
		};
		uirouterController($scope, $state);
	});

	it("should have a 10x10 aiGrid and myGrid, initialized with no guesses and x y coords", function(){
		expect(checkGrid($scope.aiGrid)).toEqual(17);
		expect(checkGrid($scope.myGrid)).toEqual(0);

		function checkGrid(grid){
			var boatSquares = 0;
			expect(grid).toBeDefined();
			expect(grid.length).toEqual(10);
			for(var i = 0; i < 10; i++){
				expect(grid[i].length).toEqual(10);
				for(var j = 0; j < 10; j++){
					expect(grid[i][j].guessed).toEqual(false);
					expect(grid[i][j].x).toEqual(j);
					expect(grid[i][j].y).toEqual(i);
					if(grid[i][j].boat){
						boatSquares++;
					}
				}
			}
			return boatSquares
		}
	});
	
	it("should place a boat from A1 to B1 when A1 is clicked", function(){
		$state.go('newgame.place');
		expect($scope.myGrid[0][0].boat).toEqual(false);
		expect($scope.myGrid[1][0].boat).toEqual(false);
		expect($scope.myGrid[2][0].boat).toEqual(false);
		$scope.myCellClicked($scope.myGrid[0][0]);
		expect($scope.myGrid[0][0].boat).toEqual(true);
		expect($scope.myGrid[1][0].boat).toEqual(true);
		expect($scope.myGrid[2][0].boat).toEqual(false);
	});
	
	it("should confirm 5 boats in the newgame.place state and then switch to the play state", function(){
		$state.go('newgame.rotate');
		$scope.confirmMyBoat();
		expect($state.cstate).toEqual('newgame.place');
		$scope.confirmMyBoat();
		$scope.confirmMyBoat();
		$scope.confirmMyBoat();
		$scope.confirmMyBoat();
		expect($state.cstate).toEqual('play');
	});
	
	it("should record a guess on a cell", function(){
		$state.go('play');
		expect($scope.aiGrid[0][0].guessed).toEqual(false);
		$scope.aiCellClicked($scope.aiGrid[0][0]);
		expect($scope.aiGrid[0][0].guessed).toEqual(true);
	});
	
	it("should sink a boat when all cells of the boat are hit", function(){
		putBoatAtA1ToA3();
		$state.go('play');
		$scope.aiCellClicked($scope.aiGrid[0][0]);
		expect($scope.aiGrid[0][0].sunk).toEqual(false);
		$scope.aiCellClicked($scope.aiGrid[0][2]);
		expect($scope.aiGrid[0][0].sunk).toEqual(false);
		expect($scope.aiGrid[0][2].sunk).toEqual(false);
		$scope.aiCellClicked($scope.aiGrid[0][1]);
		expect($scope.aiGrid[0][0].sunk).toEqual(true);
		expect($scope.aiGrid[0][1].sunk).toEqual(true);
		expect($scope.aiGrid[0][2].sunk).toEqual(true);
	});
	
	it("should only display a ship if it has sunk and the AI has not won", function(){
		putBoatAtA1ToA3();
		$state.go('play');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][0])).toEqual('.');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][1])).toEqual('.');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][2])).toEqual('.');
		$scope.aiCellClicked($scope.aiGrid[0][0]);
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][0])).toEqual('.');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][1])).toEqual('.');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][2])).toEqual('.');
		$scope.aiCellClicked($scope.aiGrid[0][1]);
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][0])).toEqual('.');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][1])).toEqual('.');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][2])).toEqual('.');
		$scope.aiCellClicked($scope.aiGrid[0][2]);
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][0])).toEqual('<');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][1])).toEqual('=');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][2])).toEqual('>');
	});
	
	it("should display all AI ships if the AI has won", function(){
		putBoatAtA1ToA3();
		$state.go('play');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][0])).toEqual('.');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][1])).toEqual('.');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][2])).toEqual('.');
		$state.go('aiwin');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][0])).toEqual('<');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][1])).toEqual('=');
		expect($scope.getAICellDisplayChar($scope.aiGrid[0][2])).toEqual('>');
	});
	
	function putBoatAtA1ToA3(){
		$scope.aiGrid[0][0].boat = true;
		$scope.aiGrid[0][0].displayChar = '<';
		$scope.aiGrid[0][1].boat = true;
		$scope.aiGrid[0][1].displayChar = '=';
		$scope.aiGrid[0][2].boat = true;
		$scope.aiGrid[0][2].displayChar = '>';
	}
});