var filtersApp = angular.module('filtersApp', []);

filtersApp.controller("filtersCtrl", function filtersCtrl($scope){
	$scope.filterText = '';
	$scope.filterType = '';
	$scope.selectedPokemon = null;
	$scope.selectedAttackType = null;
	
	$scope.typeMatching = [
//				NOR	FIG	FLY	POI	GRO	ROC	BUG	GHO	STE	FIR	WAT	GRA	ELE	PSY	ICE	DRA	DAR
{ name: 'Normal',	damage:	[1,	1,	1,	1,	1,	.5,	1,	0,	.5,	1,	1,	1,	1,	1,	1,	1,	1]},
{ name: 'Fighting',	damage:	[2,	1,	.5,	.5,	1,	2,	.5,	0,	2,	1,	1,	1,	1,	.5,	2,	1,	2]},
{ name: 'Flying',	damage:	[1,	2,	1,	1,	1,	.5,	2,	1,	.5,	1,	1,	2,	.5,	1,	1,	1,	1]},
{ name: 'Poison',	damage:	[1,	1,	1,	.5,	.5,	.5,	1,	.5,	0,	1,	1,	2,	1,	1,	1,	1,	1]},
{ name: 'Ground',	damage:	[1,	1,	0,	2,	1,	2,	.5,	1,	2,	2,	1,	.5,	2,	1,	1,	1,	1]},
{ name: 'Rock',		damage:	[1,	.5,	2,	1,	.5,	1,	2,	1,	.5,	2,	1,	1,	1,	1,	2,	1,	1]},
{ name: 'Bug',		damage:	[1,	.5,	.5, .5,	1,	1,	1,	.5,	.5,	.5,	1,	2,	1,	2,	1,	1,	2]},
{ name: 'Ghost',	damage:	[0,	1,	1,	1,	1,	1,	1,	2,	.5,	1,	1,	1,	1,	2,	1,	1,	.5]},
{ name: 'Steel',	damage:	[1,	1,	1,	1,	1,	2,	1,	1,	.5,	.5,	.5,	1,	.5,	1,	2,	1,	1]},
{ name: 'Fire',		damage:	[1,	1,	1,	1,	1,	.5,	2,	1,	2,	.5,	.5, 2,	1,	1,	2,	.5,	1]},
{ name: 'Water',	damage:	[1,	1,	1,	1,	2,	2,	1,	1,	1,	2,	.5,	.5,	1,	1,	1,	.5,	1]},
{ name: 'Grass',	damage:	[1,	1,	.5,	.5,	2,	2,	.5,	1,	.5,	.5,	2,	.5,	1,	1,	1,	.5,	1]},
{ name: 'Electric',	damage:	[1,	1,	2,	1,	0,	1,	1,	1,	1,	1,	2,	.5,	.5,	1,	1,	.5,	1]},
{ name: 'Psychic',	damage:	[1,	2,	1,	2,	1,	1,	1,	1,	.5,	1,	1,	1,	1,	.5,	1,	1,	0]},
{ name: 'Ice',		damage:	[1,	1,	2,	1,	2,	1,	1,	1,	.5,	.5,	.5,	2,	1,	1,	.5,	2,	1]},
{ name: 'Dragon',	damage:	[1,	1,	1,	1,	1,	1,	1,	1,	.5,	1,	1,	1,	1,	1,	1,	2,	1]},
{ name: 'Dark',		damage:	[1,	.5,	1,	1,	1,	1,	1,	2,	.5,	1,	1,	1,	1,	2,	1,	1,	.5]}
	];
	
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
		types: ["Flying", "Fire"]
	}, {
		name: "Squirtle",
		types: ["Water"]
	}, {
		name: "Wartortle",
		types: ["Water"]
	}, {
		name: "Blastoise",
		types: ["Water"]
	}, {
		name: "Clefable",
		types: ["Normal"]
	}, {
		name: "Primeape",
		types: ["Fighting"]
	}, {
		name: "Alakazam",
		types: ["Psychic"]
	}, {
		name: "Gengar",
		types: ["Ghost", "Poison"]
	}, {
		name: "Dragonite",
		types: ["Flying", "Dragon"]
	}];
	
	$scope.selectPokemon = function selectPokemon(poke){
		$scope.selectedPokemon = poke;
	}
	$scope.selectAttackType = function selectAttackType(type){
		$scope.selectedAttackType = type;
	}
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

filtersApp.filter("defendingTypesFilter", function(){
	return function defendingTypesFilter(input, selected){
		if(!selected){
			return input;
		}
		
		var output = [];
		for(var i = 0; i < selected.types.length; i++){
			for(var j = 0; j < input.length; j++){
				if(input[j].name === selected.types[i]){
					output.push(input[j]);
				}
			}
		}
		return output;
	}
});

filtersApp.filter("attackingTypesFilter", function(){
	return function attackingTypesFilter(input, selected){
		if(!selected){
			return input;
		}

		var output = [];
		for(var j = 0; j < input.length; j++){
			if(input[j].name === selected.name){
				output.push(input[j]);
			}
		}
		return output;
	}
});

filtersApp.filter("defendingNumbersFilter", function(){
	var oldSelection = null;
	var oldOutput = null;
	return function defendingNumbersFilter(input, selected){
		if(!selected){
			return input;
		}
		if(oldSelection === selected){
			return oldOutput;
		}
		
		var output = [];
		for(var i = 0; i < input.length; i++){
			var cout = {};
			cout.name = input[i].name;
			cout.damage = [];
			for(var j = 0; j < input[i].damage.length; j++){
				for(var k = 0; k < selected.types.length; k++){
					if(input[j].name === selected.types[k]){
						cout.damage.push(input[i].damage[j]);
					}
				}
			}
			output.push(cout);
		}
		oldSelection = selected;
		oldOutput = output;
		return output;
	}
});
