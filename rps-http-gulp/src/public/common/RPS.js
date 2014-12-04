var RPS = {
    App: angular.module('RPSApp', appDependencies),
    Directives: angular.module('RPSDirectives', []),
    Controllers: angular.module('RPSControllers', []),
    Services: angular.module('RPSServices', ['ngResource']),
    Partials: angular.module('RPSPartials', []),
    Definitions: angular.module('RPSDefinitions', [])
};
