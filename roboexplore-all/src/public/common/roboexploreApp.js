var roboexploreApp = {
	App: angular.module('roboexploreApp', ['ui.router', 'roboexploreDirectives', 'roboexploreControllers', 'roboexploreServices']),
	Directives: angular.module('roboexploreDirectives', []),
	Controllers: angular.module('roboexploreControllers', []),
	Services: angular.module('roboexploreServices', [])
};

roboexploreApp.App.config(uirouteConfig);
window.roboexploreApp = roboexploreApp;

function uirouteConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/")
	$stateProvider
		.state('default', {
			url: '/',
			templateUrl: 'features/world/world-partial.html'
		});
}
