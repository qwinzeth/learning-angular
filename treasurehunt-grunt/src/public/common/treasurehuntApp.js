var treasurehuntApp = {
	App: angular.module('treasurehuntApp', ['ui.router', 'treasurehuntDirectives', 'treasurehuntControllers', 'treasurehuntServices']),
	Directives: angular.module('treasurehuntDirectives', []),
	Controllers: angular.module('treasurehuntControllers', []),
	Services: angular.module('treasurehuntServices', [])
};

treasurehuntApp.App.config(uirouteConfig);
window.treasurehuntApp = treasurehuntApp;

function uirouteConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");
	$stateProvider
		.state('default', {
			url: '/',
			templateUrl: 'features/treasure-field/treasure-field-partial.html'
		});
}
