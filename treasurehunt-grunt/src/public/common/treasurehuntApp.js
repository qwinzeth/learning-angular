var treasurehuntApp = {
	App: angular.module('treasurehuntApp', ['ui.router', 'treasurehuntDirectives', 'treasurehuntControllers', 'treasurehuntServices']),
	Directives: angular.module('treasurehuntDirectives', []),
	Controllers: angular.module('treasurehuntControllers', []),
	Services: angular.module('treasurehuntServices', [])
};

treasurehuntApp.App.config(uirouteConfig);
window.treasurehuntApp = treasurehuntApp;

function uirouteConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/play/default");
	$stateProvider
		.state('default', {
			url: '/play',
			templateUrl: 'features/game/game-partial.html'
		}).state('default.treasurefield', {
			url: '/default',
			views: {
				'treasureField': { templateUrl: 'features/treasure-field/treasure-field-partial.html' },
				'hud': { templateUrl: 'features/hud/hud-partial.html' }
			}
		});
}
