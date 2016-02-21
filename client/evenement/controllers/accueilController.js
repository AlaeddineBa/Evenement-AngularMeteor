angular
        .module('event')
        .controller('accueilController', accueilController);

    accueilController.$inject = ['$reactive', '$scope'];

    function accueilController($reactive, $scope){
        $reactive(this).attach($scope);
        var vm = this;

        vm.subscribe('evenements');

        vm.helpers({
                accueil: () => {
                return Evenements.find({});
                }
        })
    };
