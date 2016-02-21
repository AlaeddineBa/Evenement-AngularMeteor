angular.module('event').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('accueilEvent', {
            url: '/accueil',
            template: '<accueil-event></accueil-event>'
        })
        .state('moreEvent', {
            url: '/more/:eventId',
            template: '<more-event></more-event>'
        })
        .state('editEvent', {
            url: '/edit/:eventId',
            template: '<edit-event></edit-event>'
        });


    $urlRouterProvider.otherwise("/accueil");
});
