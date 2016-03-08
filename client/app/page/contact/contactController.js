angular
    .module('event')
    .controller('contactController', contactController);

contactController.$inject = ['$reactive', '$scope'];

function contactController($reactive, $scope) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.sendMail = sendMail;

    function sendMail(email, text){
        Meteor.call('sendEmail', email, text);
    }





};
