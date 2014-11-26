var directivesApp = {
	App: angular.module('directivesApp', ['ui.router', 'directivesDirectives', 'directivesControllers']),
	Directives: angular.module('directivesDirectives', []),
	Controllers: angular.module('directivesControllers', [])
};

window.directivesApp = directivesApp;