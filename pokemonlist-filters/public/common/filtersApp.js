var filtersApp = angular.module('filtersApp', []);

filtersApp.controller("filtersCtrl", function filtersCtrl($scope){
	$scope.filterText = '';
	$scope.filterType = '';

	$scope.pokemon = [{
		name: "Bulbasaur",
		types: ["Grass"]
	}, {
		name: "Ivysaur",
		types: ["Grass"]
	}, {
		name: "Venasaur",
		types: ["Grass"]
	}, {
		name: "Charmander",
		types: ["Fire"]
	}, {
		name: "Charmeleon",
		types: ["Fire"]
	}, {
		name: "Charizard",
		types: ["Fire", "Flying"]
	}, {
		name: "Squirtle",
		types: ["Water"]
	}, {
		name: "Wartortle",
		types: ["Water"]
	}, {
		name: "Blastoise",
		types: ["Water"]
	}];
});

filtersApp.filter("typesFilter", function(){
	return function filtersFilter(input, searchString){
		var output = [];
		for(var i = 0; i < input.length; i++){
			for(var j = 0; j < input[i].types.length; j++){
				if(input[i].types[j].indexOf(searchString) != -1){
					output.push(input[i])
					break;
				}
			}
		}
		return output;
	}
});