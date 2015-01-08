var appDependencies = [
    'RPSDirectives',
    'RPSControllers',
    'RPSServices',
    'RPSPartials',
    'RPSDefinitions'
];

var angular = require('./angular.min.js');
console.log(angular);

var _ = require('lodash');
_.each("Success", function(c){
	console.log(c);
});

var RPS = {
    App: angular.module('RPSApp', appDependencies),
    Directives: angular.module('RPSDirectives', []),
    Controllers: angular.module('RPSControllers', []),
    Services: angular.module('RPSServices', []),
    Partials: angular.module('RPSPartials', []),
    Definitions: angular.module('RPSDefinitions', [])
};

window.RPS = RPS;
