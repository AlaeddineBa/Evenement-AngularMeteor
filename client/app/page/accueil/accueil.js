(function () {
    'use strict';

    angular
        .module('event')
        .controller('accueilController', accueilController);

    accueilController.$inject = ['$mdDialog', '$reactive', '$scope', '$state'];

    function accueilController($mdDialog, $reactive, $scope, $state) {
        $reactive(this).attach($scope);
        let vm = this;

        vm.showLogInDialog = showLogInDialog;
        vm.showSignInDialog = showSignInDialog;

        function showLogInDialog(ev) {
            $mdDialog.show({
                controller: DialogLogInController,
                controllerAs: 'vm',
                templateUrl: 'client/app/page/accueil/login-popup.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (auth) {
                console.log(auth); //meteor call
                Meteor.loginWithPassword(auth.email, auth.password, function (error) {
                    if (error) {
                        console.log(error.reason);
                    } else {
                        $state.go("dashboard.basic.displayEvent");
                    }
                });
            }, function () {
                console.log('rien');
            });
        }

        function showSignInDialog(ev) {
            $mdDialog.show({
                controller: DialogSignInController,
                controllerAs: 'vm',
                templateUrl: 'client/app/page/accueil/register-popup.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (signup) {
                console.log(signup); //meteor call
                Accounts.createUser({
                    email: signup.email,
                    password: signup.password,
                    username: signup.username
                });
            }, function () {
                console.log('rien');
            });
        }

        function DialogLogInController() {

            let vm = this;

            vm.cancel = function () {
                $mdDialog.cancel();
            };

            vm.answer = function () {
                if (vm.auth.email && vm.auth.password)
                    $mdDialog.hide(vm.auth);

            };
        }

        function DialogSignInController() {

            let vm = this;
            vm.signup = {email: "", username: "", password: ""};
            vm.cancel = function () {
                $mdDialog.cancel();
            };

            vm.answer = function () {
                if (vm.signup.email && vm.signup.password && vm.signup.username && vm.signup.confirmPassword) {
                    $mdDialog.hide(vm.signup);
                    toastr.success("Inscription");
                }

                else {
                    toastr.error("Vous devez remplir tous les champs pour s'inscrire");
                }

            };
        }


    }

})();