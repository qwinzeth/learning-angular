function robobuildController($scope, $state) {
	var BODY_METAL = {
		description: "Metal body."
	};
	var BODY_RUBBER = {
		description: "Rubber body."
	};
	var BODY_GLASS = {
		description: "Glass body."
	};

	var HAND_FINGERS = {
		description: "Fingers."
	};
	var HAND_PINCERS = {
		description: "Pincers."
	};
	var HAND_FLAMETHROWERS = {
		description: "Flamethrowers."
	};
	var HAND_CHAINSAWS = {
		description: "Chainsaws."
	};
	
	var LEG_LONG = {
		description: "Long legs."
	};
	var LEG_SHORT = {
		description: "Short legs."
	};
	
	$scope.BODY_OPTIONS = [BODY_METAL, BODY_RUBBER, BODY_GLASS];
	$scope.HAND_OPTIONS = [HAND_FINGERS, HAND_PINCERS, HAND_FLAMETHROWERS, HAND_CHAINSAWS];
	$scope.LEG_OPTIONS = [LEG_LONG, LEG_SHORT];	
	
	var SITUATIONS = [{
		description: "A small door.",
		go: function(){
			var resultsText = 'Your robot tries to open the door. ';
			switch($scope.chosenHands){
			case HAND_FINGERS:
			case HAND_PINCERS:
				resultsText += 'It manages to grab the handle and open it. ';
			break;
			case HAND_FLAMETHROWERS:
				return {pass: false, text: resultsText + "Your robot catches the door on fire, which catches your robot on fire, which explodes your robot."};
			break;
			case HAND_CHAINSAWS:
				resultsText += 'Its chainsaws rip the door to pieces. ';
			break;
			}
			
			switch($scope.chosenLegs){
			case LEG_LONG:
				return {pass: false, text: resultsText + "Your robot is too tall for the door."};
			break;
			case LEG_SHORT:
				resultsText += 'Your robot walks through the door!';
			break;
			}
			
			return {pass: true, text: resultsText};
		}
	}, {
		description: 'A wooden ladder leads up into darkness.',
		go: function(){
			var resultsText = 'Your robot tries to climb the ladder. ';
			switch($scope.chosenHands){
			case HAND_FINGERS:
				resultsText += 'It grabs a rung in its fingers. ';
			break;
			case HAND_PINCERS:
				return {pass: false, text: resultsText + 'It pinches the wooden rungs apart, and fails to climb the ladder.'};
			break;
			case HAND_FLAMETHROWERS:
				return {pass: false, text: resultsText + 'It catches the ladder on fire, which catches your robot on fire, which explodes your robot.'};
			break;
			case HAND_CHAINSAWS:
				return {pass: false, text: resultsText + 'Its chainsaws destroy the ladder.'};
			break;
			}
			
			switch($scope.chosenBody){
			case BODY_METAL:
				return {pass: false, text: resultsText + 'Your robot is too heavy and the ladder breaks.'};
			break;
			case BODY_RUBBER:
			case BODY_GLASS:
				resultsText += 'Your robot begins climbing the ladder. ';
			break;
			}
			
			return {pass: true, text: resultsText};
		}
	}, {
		description: 'A dark corridor.',
		go: function(){
			var resultsText = 'Your robot begins walking. ';
			
			if($scope.chosenHands != HAND_FLAMETHROWERS){
				return {pass: false, text: resultsText + 'It can\'t see and falls down a bottomless pit.'};
			}
			
			resultsText += 'Its flamethrowers illuminate a bottomless pit with a wooden board spanning it. Your robot begins walking across. ';
			if($scope.chosenBody != BODY_GLASS){
				return {pass: false, text: resultsText + 'Its body is too heavy and snaps the board, sending your robot into the abyss.'};
			}
			
			return {pass: true, text: resultsText + 'It crosses to the other side!'};
		}
	}, {
		description: 'A pool of water in front of a cave exit.',
		go: function(){
			var resultsText = 'Your robot wades into the pool. ';
			if($scope.chosenLegs != LEG_LONG){
				return {pass: false, text: resultsText + 'Its legs get stuck in the mud at the bottom of the pool.'};
			}
			
			if($scope.chosenBody == BODY_METAL){
				return {pass: false, text: resultsText + 'There are electric eels in the pool! They shock your robot, and your robot explodes.'};
			}
			
			return {pass: true, text: resultsText + 'There are electric eels in the pool, but they don\'t bother your robot, which makes it to the cave entrance.'};
		}
	}];

	var currentSituationIndex = 0;
	
	$scope.chosenBody = BODY_METAL;
	$scope.chosenHands = HAND_FINGERS;
	$scope.chosenLegs = LEG_LONG;
	$scope.currentSituation = SITUATIONS[currentSituationIndex];
	$scope.runResults = '';
	
	$scope.chooseBody = chooseBody;
	$scope.chooseHands = chooseHands;
	$scope.chooseLegs = chooseLegs;
	$scope.robotGo = robotGo;
	$scope.loadNextScenario = loadNextScenario;
	
	angular.element(document).ready(function(){
		$state.go("build");
	});
	
	function chooseBody(newbody){
		$scope.chosenBody = newbody;
	}

	function chooseHands(newhands){
		$scope.chosenHands = newhands;
	}
	
	function chooseLegs(newlegs){
		$scope.chosenLegs = newlegs;
	}
	
	function robotGo(){
		var runResults = $scope.currentSituation.go();
		$scope.runResults = runResults.text;
		if(runResults.pass){
			$state.go("run.pass");			
		}else{
			$state.go("build");
		}
	}
	
	function loadNextScenario(){
		currentSituationIndex++;
		if(currentSituationIndex < SITUATIONS.length){
			$scope.currentSituation = SITUATIONS[currentSituationIndex];
			$scope.runResults = '';
			$state.go("build");
		}else{
			$state.go("victory");
		}
	}
}

function robobuildConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/build/legs")
	$stateProvider
		.state('build', {
			url: '/build',
			templateUrl: 'partials/build.html'
		}).state('build.body', {
			url: '/body',
			templateUrl: 'partials/build/body.html'
		}).state('build.hands', {
			url: '/hands',
			templateUrl: 'partials/build/hands.html'
		}).state('build.legs', {
			url: '/legs',
			templateUrl: 'partials/build/legs.html'
		}).state('run', {
			url: '/run',
			templateUrl: 'partials/run.html'
		}).state('run.fail', {
			url: '/fail',
			templateUrl: 'partials/run/fail.html'
		}).state('run.pass', {
			url: '/pass',
			templateUrl: 'partials/run/pass.html'
		}).state('victory', {
			url: '/victory',
			templateUrl: 'partials/victory.html'
		});
}

var robobuildApp = angular.module("robobuildApp", ['ui.router']);

robobuildApp.controller("robobuildCtrl", robobuildController);
robobuildApp.config(robobuildConfig);
