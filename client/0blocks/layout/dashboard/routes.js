(function () {
    'use strict';

    angular
        .module('event')
        .config(routeConfig)

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                abstract: true,
                templateUrl:'client/0blocks/layout/dashboard/dashboard.html'
            })
            .state('dashboard.basic', {
                abstract: true,
                views: {
                    sidebarLeft:{
                        templateUrl:'client/0blocks/layout/dashboard/sidebar/sidebarleft.html',
                        controller: 'sidenavController',
                        controllerAs: 'vm'
                    },
                    toolbar:{
                        templateUrl:'client/0blocks/layout/dashboard/toolbar/toolbar.html',
                        controller: 'toolbarController',
                        controllerAs: 'vm'
                    },
                    content:{
                        template:'<div ui-view="main"></div>'
                    }

                }
            });

    }
})();

