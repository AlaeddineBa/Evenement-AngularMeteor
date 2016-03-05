angular
    .module('event')
    .controller('displayController', displayController);

displayController.$inject = ['$reactive', '$scope', '$meteor', '$mdDialog'];

function displayController($reactive, $scope, $meteor, $mdDialog) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.deleteEvent = deleteEvent;
    vm.showConfirm = showConfirm;
    vm.showAdd = showAdd;
    vm.searchfilter = searchfilter;

    vm.subscribe('evenements');
    console.log(Meteor.user());
    vm.helpers({
        evenements: () => Evenements.find({})

    });

    function deleteEvent(id) {
        $meteor.call('removeEvent', id);
    }


    function showConfirm(ev, id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Delete')
            .textContent('Voulez-vous vraiment effacer cet evenement')
            .ariaLabel('Delete')
            .targetEvent(ev)
            .ok('Oui')
            .cancel('Non');

        $mdDialog.show(confirm).then(function () {
            deleteEvent(id);
            toastr.success("Evenement effacé");
        }, function () {
            toastr.warning("Evenement non effacé");
        });
    };

    function showAdd(ev, eventAM) {
        $mdDialog.show({
                locals: {eventAM: eventAM},
                controller: DialogController,
                controllerAs: 'vm',
                templateUrl: 'client/app/page/display/addEvent-popup.html',
                targetEvent: ev

            })
            .then(function (event) {
                if (eventAM) {
                    Meteor.call('updateEvent', event);
                    toastr.success("Evenement modifié");
                    vm.ville.push(event.ville);
                    console.log(vm.ville);
                } else {
                    Meteor.call('insertEvent', event);
                    toastr.success("Evenement ajouté");
                }
            }, function () {
                if (eventAM) {
                    toastr.warning("Evenement non modifié");
                } else {
                    toastr.warning("Evenement non ajouté");
                }
            });
    };

    function searchfilter() {
        $reactive(this).attach($scope);
        let vm = this;
        let search = [];
        search.cordo = {}
        if (vm.recherche) {
            let res = vm.recherche.split(" ");
            if (res.length == 0) {
                //search.cordo = {};
                console.log("test");
            } else if (res.length == 1) {
                search.cordo.$ = res[0];
            }else if (res.length == 2) {
                search.cordo.firstname = res[0];
                search.cordo.lastname = res[1];
            }
        }
        return search;
    }

    function DialogController($mdDialog, eventAM) {
        let vm = this;

        let cleanArray = function (array) {
            var i, j, len = array.length, out = [], obj = {};
            for (i = 0; i < len; i++) {
                obj[array[i]] = 0;
            }
            for (j in obj) {
                out.push(j);
            }
            return out;
        }

        vm.event = {};
        let villeT = [];

        for (var i = 0; i < Evenements.find({}).count(); i++) {
            villeT.push(Evenements.find({}).fetch()[i].ville);
        }
        vm.ville = cleanArray(villeT);

        if (eventAM) {
            vm.event._id = eventAM._id;
            vm.event.cordo.firstname = eventAM.cordo.firstname;
            vm.event.cordo.lastname = eventAM.cordo.lastname;
            vm.event.ville = eventAM.ville;
            vm.event.date = eventAM.date;
            vm.event.base64 = eventAM.base64;
            vm.title = "Update";
            vm.button = "Update";
        } else {
            vm.event.cordo.firstname = "";
            vm.event.cordo.lastname = "";
            vm.event.ville = "";
            vm.event.date = "";
            vm.event.base64 = "";
            vm.title = "Ajout";
            vm.button = "Ajouter";
        }

        vm.hide = function () {
            $mdDialog.hide();
        };
        vm.cancel = function () {
            $mdDialog.cancel();
        };
        vm.answer = function (event) {
            $mdDialog.hide(event);
        };

        vm.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
            vm.event.base64 = fileObj.base64;
            vm.pick = fileObj.base64;
        }
    };
};
