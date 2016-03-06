(function () {
    'use strict';

    angular
        .module('event')
        .controller('toolbarController', toolbarController);

    toolbarController.$inject = ['$state', '$reactive', '$scope', '$mdSidenav'];
    function toolbarController($state, $reactive, $scope, $mdSidenav) {
        $reactive(this).attach($scope);
        var vm = this;

        vm.logout = logout;
        vm.toggleSidenav = toggleSidenav;

        function logout() {
            Meteor.logout();
            /*$state.go('accueil');*/
            $state.go('accueil2.basic.login');
        }

        function toggleSidenav(menuId) {
            $mdSidenav(menuId).toggle();
        }

    }

})();