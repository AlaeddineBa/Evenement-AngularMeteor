angular
    .module('event')
    .controller('formController', formController);

    formController.$inject = ['$reactive', '$scope'];

    function formController($reactive, $scope){
        $reactive(this).attach($scope);

        var vm = this;

        vm.event = {};
        vm.logoPick = 'data:image/png;base64,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';
        vm.pick = '';

        vm.addEvent = addEvent;
        vm.onLoad = onLoad;

         function addEvent(event){
             if(Object.keys(vm.event).length < 4){
                 alert('SVP remplisez tous les champs');
                 return false;
             }
             if(vm.event.base64 == undefined || vm.event.base64 == null ||
                 vm.event.base64 == '' ){
                 alert('SVP Choisisez un logo');
                 return false;
             }
            Meteor.call('insertEvent', event);
            vm.event = "";
            vm.logoPick = 'data:image/png;base64,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';
        };

         function onLoad(e, reader, file, fileList, fileOjects, fileObj){
            vm.event.base64 = fileObj.base64;
            vm.logoPick = 'data:image/png;base64,'+fileObj.base64;
            vm.pick = fileObj.base64;
         }
    };
