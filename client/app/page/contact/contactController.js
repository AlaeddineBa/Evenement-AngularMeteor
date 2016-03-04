angular
    .module('event')
    .controller('contactController', contactController);

contactController.$inject = ['$reactive', '$scope'];

function contactController($reactive, $scope) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.sendMail = sendMail;

    function sendMail(email, text){
        console.log("send1");
        Meteor.call('sendEmail', email, text);

        console.log(email+" "+text);
    }





};
