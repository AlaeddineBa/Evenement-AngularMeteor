(function () {
    'use strict';

    angular
        .module('event')
        .config(routeConfig)

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.basic.displayEvent', {
                url: '/dashboard',
                views: {
                    main: {
                        template: '<display-event></display-event>'
                    }
                },
                resolve: {
                    currentUser: ($q) => {
                        if(Meteor.userId() == null)
                        return $q.reject("AUTH_REQUIRED");
                        else $q.resolve();
                    }
                }
            });
    }
})();
