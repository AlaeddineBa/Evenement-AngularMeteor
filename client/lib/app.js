angular
    .module('event', ['angular-meteor', 'ui.router', 'naif.base64', 'ngMaterial', 'angular-meteor.auth', 'ngMessages'])
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                $state.go('accueil2.basic.login');
            }
        });
    });
