var pinballApp = {
	App: angular.module('pinballApp', ['ui.router', 'pinballControllers', 'pinballServices']),
	Controllers: angular.module('pinballControllers', []),
	Services: angular.module('pinballServices', [])
};

window.pinballApp = pinballApp;