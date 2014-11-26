describe('robobuildCtrl', function(){
	var $scope;
	var $state;
	beforeEach(function(){
		$scope = {};
		$state = {
			cstate: '',
			go: function(newstate){
				$state.cstate = newstate
			}};
		robobuildController($scope, $state);
	});

	it("should alter the robot according to choices", function(){
		for(var body = 0; body < $scope.BODY_OPTIONS.length; body++){
			$scope.chooseBody($scope.BODY_OPTIONS[body]);
			for(var hands = 0; hands < $scope.HAND_OPTIONS.length; hands++){
				$scope.chooseHands($scope.HAND_OPTIONS[hands]);
				for(var legs = 0; legs < $scope.LEG_OPTIONS.length; legs++){
					$scope.chooseLegs($scope.LEG_OPTIONS[legs]);
					expect($scope.chosenBody).toEqual($scope.BODY_OPTIONS[body]);
					expect($scope.chosenHands).toEqual($scope.HAND_OPTIONS[hands]);
					expect($scope.chosenLegs).toEqual($scope.LEG_OPTIONS[legs]);
				}
			}
		}
	});
	
	it("should not be able to walk through the small door in scenario 1 with long legs", function(){
		$scope.chooseLegs($scope.LEG_OPTIONS[0]);
		$scope.robotGo();
		expect($state.cstate).toEqual('build');
	});

	it("should not be able to walk through the small door in scenario 1 with flamethrower hands", function(){
		$scope.chooseLegs($scope.LEG_OPTIONS[1]);
		$scope.chooseHands($scope.HAND_OPTIONS[2]);
		$scope.robotGo();
		expect($state.cstate).toEqual('build');
	});

	it("should be able to walk through the small door in scenario 1 with short legs and chainsaw hands", function(){
		$scope.chooseLegs($scope.LEG_OPTIONS[1]);
		$scope.chooseHands($scope.HAND_OPTIONS[3]);
		$scope.robotGo();
		expect($state.cstate).toEqual('run.pass');
	});
	
	it("should fail scenario 2 with pincers", function(){
		$scope.loadNextScenario();
		$scope.chooseHands($scope.HAND_OPTIONS[1]);
		$scope.robotGo();		
		expect($state.cstate).toEqual('build');
	});

	it("should fail scenario 2 with metal body", function(){
		$scope.loadNextScenario();
		$scope.robotGo();		
		expect($state.cstate).toEqual('build');
	});

	it("should pass scenario 2 with rubber body", function(){
		$scope.loadNextScenario();
		$scope.chooseBody($scope.BODY_OPTIONS[1]);
		$scope.robotGo();		
		expect($state.cstate).toEqual('run.pass');
	});
	
	it("should fail scenario 3 with short legs", function(){
		$scope.loadNextScenario();
		$scope.loadNextScenario();
		$scope.chooseLegs($scope.LEG_OPTIONS[1]);
		$scope.robotGo();
		expect($state.cstate).toEqual('build');
	});

	it("should fail scenario 3 with long legs and metal body", function(){
		$scope.loadNextScenario();
		$scope.loadNextScenario();
		$scope.chooseLegs($scope.LEG_OPTIONS[0]);
		$scope.chooseBody($scope.BODY_OPTIONS[0]);
		$scope.robotGo();
		expect($state.cstate).toEqual('build');
	});

	it("should pass scenario 3 with long legs and rubber body", function(){
		$scope.loadNextScenario();
		$scope.chooseLegs($scope.LEG_OPTIONS[0]);
		$scope.chooseBody($scope.BODY_OPTIONS[1]);
		$scope.robotGo();		
		expect($state.cstate).toEqual('run.pass');
	});
});