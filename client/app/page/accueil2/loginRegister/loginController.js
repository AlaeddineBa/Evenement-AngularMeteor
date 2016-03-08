angular
    .module('event')
    .controller('loginController', loginController);

loginController.$inject = ['$reactive', '$scope', '$state'];

function loginController($reactive, $scope, $state) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.login = login;
    vm.register = register;

    function login (auth){
        Meteor.loginWithPassword(auth.email, auth.password, function (error) {
            if (error) {
                console.log(error.reason);
                toastr.warning(error.reason);
            } else {
                $state.go("dashboard.basic.displayEvent");
            }
        });
    }

    function register(){
        $state.go("accueil2.basic.register");
    }

}
