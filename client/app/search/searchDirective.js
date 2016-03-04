angular
    .module('event')
    .directive('searchEvent', function () {
    return {
        restrict: 'E',
        template: '<md-input-container class="md-icon-float md-block search-place">' +
        '<label>Recherche</label>' +
        '<md-icon class="search-icon" md-svg-icon="action:ic_search_24px"></md-icon>' +
        '<input class="search-input" ng-model="vm.recherche" type="text" style="border-width: 0 0 0 0;">' +
        '</md-input-container>'
    }
});
