(function () {
    'use strict';

    angular
        .module('event')
        .config(routeConfig)

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('accueil2.basic.login', {
                url: '/login',
                views: {
                    lore: {
                        templateUrl: 'client/app/page/accueil2/loginRegister/login-popup.html'
                    }
                }
            })
            .state('accueil2.basic.register', {
                url: '/register',
                views: {
                    lore: {
                        templateUrl: 'client/app/page/accueil2/loginRegister/register-popup.html'
                    }
                }
            });
    }
})();
