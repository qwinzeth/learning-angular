function stylusController($scope) {
	var STATE_PLAYING = 0;
	var STATE_WON = 1;
	var STATE_LOST = 2;
	var pegCount = 4;
	var guessesAllowed = 10;
	$scope.gameState = STATE_PLAYING;
	$scope.currentGuessRow = guessesAllowed - 1;
	$scope.colorNames = ["empty", "red", "green", "blue", "yellow", "white", "black"];
	$scope.selectedPeg = null;
    $scope.guesses = [];
	$scope.answer = [];	
	$scope.clickedPeg = clickedPeg;
	$scope.selectedColor = selectedColor;
	$scope.makeGuess = makeGuess;
	$scope.showColorSelection = showColorSelection;
	$scope.showGuessButton = showGuessButton;
	$scope.showAnswers = showAnswers;
	$scope.stillPlaying = stillPlaying;
	$scope.youWin = youWin;
	$scope.youLose = youLose;

	for(var i = 0; i < guessesAllowed; i++){
		$scope.guesses[i] = {guessPegs: [], infoPegs: []};
		for(var j = 0; j < pegCount; j++){
			$scope.guesses[i].guessPegs.push({colorName: "empty", guessRow: i});
			$scope.guesses[i].infoPegs.push({colorName: "empty"});
		}
	}
	
	for(var i = 0; i < pegCount; i++){
		$scope.answer.push({colorName: $scope.colorNames[parseInt(Math.random() * $scope.colorNames.length)]});
	}
	
	function clickedPeg(peg){
		if(peg.guessRow == $scope.currentGuessRow){
			$scope.selectedPeg = peg;
		}
	}
	
	function selectedColor(colorName){
		$scope.selectedPeg.colorName = colorName;
		$scope.selectedPeg = null;
	}
	
	function makeGuess(){
		var STATUS_UNUSED = 0;
		var STATUS_RIGHT_COLOR = 1;
		var STATUS_CORRECT = 2;
		var statusAnswer = [];
		var statusGuess = [];
		var rightColor = 0;
		var correct = 0;
		for(var i = 0; i < $scope.answer.length; i++){
			if($scope.answer[i].colorName == $scope.guesses[$scope.currentGuessRow].guessPegs[i].colorName){
				statusAnswer.push(STATUS_CORRECT);
				statusGuess.push(STATUS_CORRECT);
				correct++;
			}else{
				statusAnswer.push(STATUS_UNUSED);
				statusGuess.push(STATUS_UNUSED);
			}
		}
		
		for(var i = 0; i < $scope.answer.length; i++){
			if(statusAnswer[i] != STATUS_UNUSED){
				continue;
			}
			
			for(var j = 0; j < $scope.answer.length; j++){
				if(statusGuess[j] != STATUS_UNUSED){
					continue;
				}
				if($scope.answer[i].colorName == $scope.guesses[$scope.currentGuessRow].guessPegs[j].colorName){
					statusAnswer[i] = STATUS_RIGHT_COLOR;
					statusGuess[j] = STATUS_RIGHT_COLOR;
					rightColor++;
					break;
				}
			}
		}
		
		for(var i = 0; i < correct; i++){
			$scope.guesses[$scope.currentGuessRow].infoPegs[i].colorName = "black";
		}
		
		for(var j = 0; j < rightColor; j++){
			$scope.guesses[$scope.currentGuessRow].infoPegs[i + j].colorName = "white";
		}
		
		if(correct < pegCount){
			if($scope.currentGuessRow > 0){
				$scope.currentGuessRow--;
			}else{
				$scope.gameState = STATE_LOST;
			}
		}else{
			$scope.gameState = STATE_WON;
		}
	}
	
	function showColorSelection(){
		return $scope.selectedPeg != null && $scope.gameState == STATE_PLAYING;
	}

	function showGuessButton(){
		return $scope.selectedPeg == null && $scope.gameState == STATE_PLAYING;
	}
	
	function showAnswers(){
		return $scope.gameState != STATE_PLAYING;
	}
	
	function stillPlaying(){
		return $scope.gameState == STATE_PLAYING;
	}

	function youWin(){
		return $scope.gameState == STATE_WON;
	}

	function youLose(){
		return $scope.gameState == STATE_LOST;
	}
}

var stylusApp = angular.module("stylusApp", []);

stylusApp.controller("StylusCtrl", stylusController);
