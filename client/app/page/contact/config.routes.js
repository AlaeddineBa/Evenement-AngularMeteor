(function () {
    'use strict';

    angular
        .module('event')
        .config(routeConfig)

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.basic.contact', {
                url: '/contact',
                views: {
                    main: {
                        templateUrl: 'client/app/page/contact/contact.html'
                    }
                },
                resolve: {
                    user: ['$auth', function ($auth) {
                        return $auth.requireUser();
                    }]
                }
            });
    }
})();
