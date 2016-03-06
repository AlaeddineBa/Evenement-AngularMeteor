(function () {
    'use strict';

    angular
        .module('event')
        .config(routeConfig)

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('accueil2', {
                abstract: true,
                templateUrl:'client/app/page/accueil2/accueil.html'
            })
            .state('accueil2.basic', {
                abstract: true,
                views: {

                    loginRegister:{
                        template:'<div ui-view="lore"></div>'
                    }

                }
            });

    }
})();
