angular.module('event').directive('accueilEvent', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/views/home.html',
        controllerAs: 'accueilEvent'
    }
});