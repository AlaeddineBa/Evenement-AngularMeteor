angular
    .module('event')
    .controller('registerController', registerController);

registerController.$inject = ['$reactive', '$scope', '$state'];

function registerController($reactive, $scope, $state) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.register = register;

    function register (signup){
        Accounts.createUser({
            email: signup.email,
            password: signup.password,
            username: signup.username
        });
        $state.go("accueil2.basic.login");

    }

}
