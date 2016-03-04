angular
    .module('event')
    .controller('sidenavController', sidenavController);

sidenavController.$inject = ['$scope', '$state'];

function sidenavController($scope, $state) {

    $scope.goToDisplay = function () {
        $state.go("dashboard.basic.displayEvent");
    }
    $scope.goToContact = function () {
        $state.go("dashboard.basic.contact");
    }
}