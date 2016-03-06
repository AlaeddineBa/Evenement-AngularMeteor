angular
    .module('event')
    .controller('sidenavController', sidenavController);

sidenavController.$inject = ['$scope', '$state', '$reactive'];

function sidenavController($scope, $state, $reactive) {
    $reactive(this).attach($scope);
    let vm = this;

    vm.goToDisplay = goToDisplay;
    vm.goToContact = goToContact;

    function goToDisplay() {
        $state.go("dashboard.basic.displayEvent");
    }

    function goToContact() {
        $state.go("dashboard.basic.contact");
    }
}

