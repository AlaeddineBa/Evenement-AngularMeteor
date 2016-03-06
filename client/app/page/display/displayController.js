angular
    .module('event')
    .controller('displayController', displayController);

displayController.$inject = ['$reactive', '$scope', '$mdDialog'];

function displayController($reactive, $scope, $mdDialog) {
    $reactive(this).attach($scope);
    var vm = this;

    vm.deleteEvent = deleteEvent;
    vm.showConfirm = showConfirm;
    vm.showAdd = showAdd;
    vm.searchfilter = searchfilter;

    vm.subscribe('evenements');
    //console.log(Meteor.user());
    vm.helpers({
        evenements: () => Evenements.find({})

    });

    function deleteEvent(id) {
        Meteor.call('removeEvent', id);
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
    }

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

                    //vm.ville.push(event.ville);
                } else {
                    Meteor.call('insertEvent', event);
                    toastr.success("Evenement ajouté");
                }
            }, function () {
                vm.helpers({
                    evenements: () => Evenements.find({})

                });
                if (eventAM) {
                    toastr.warning("Evenement non modifié");
                } else {
                    toastr.warning("Evenement non ajouté");
                }
            });
    }

    function searchfilter() {

        let search = [];
        search.details = {};
        if (vm.recherche) {
            let res = vm.recherche.split(" ");
            if (res.length == 0) {
                //search.details = {};
                console.log("test");
            } else if (res.length == 1) {
                search.details.$ = res[0];
            } else if (res.length == 2) {
                search.details.firstname = res[0];
                search.details.lastname = res[1];
            }
        }
        return search;
    }

    function DialogController($mdDialog, eventAM) {
        let vm = this;

        vm.states = ['Albanie',
            'Algérie',
            'Allemagne',
            'Andorre',
            'Angola',
            'Arabie saoudite',
            'Argentine',
            'Arménie',
            'Australie',
            'Autriche',
            'Azerbaïdjan',
            'Bahamas',
            'Bahreïn',
            'Bangladesh',
            'Barbade',
            'Belau',
            'Belgique',
            'Belize',
            'Bénin',
            'Bhoutan',
            'Biélorussie',
            'Birmanie',
            'Bolivie',
            'Bosnie-Herzégovine',
            'Botswana',
            'Brésil',
            'Brunei',
            'Bulgarie',
            'Burkina',
            'Burundi',
            'Cambodge',
            'Cameroun',
            'Canada',
            'Cap-Vert',
            'Chili',
            'Chine',
            'Chypre',
            'Colombie',
            'Comores',
            'Congo',
            'Cook',
            'Corée du Nord',
            'Corée du Sud',
            'Costa Rica',
            'Croatie',
            'Cuba',
            'Danemark',
            'Djibouti',
            'Dominique',
            'Égypte',
            'Émirats arabes unis',
            'Équateur',
            'Érythrée',
            'Espagne',
            'Estonie',
            'États-Unis',
            'Éthiopie',
            'Fidji',
            'Finlande',
            'France',
            'Gabon',
            'Gambie',
            'Géorgie',
            'Ghana',
            'Grèce',
            'Grenade',
            'Guatemala',
            'Guinée',
            'Guinée-Bissao',
            'Guyana',
            'Haïti',
            'Honduras',
            'Hongrie',
            'Inde',
            'Indonésie',
            'Iran',
            'Iraq',
            'Irlande',
            'Islande',
            'Italie',
            'Jamaïque',
            'Japon',
            'Jordanie',
            'Kazakhstan',
            'Kenya',
            'Kirghizistan',
            'Kiribati',
            'Koweït',
            'Laos',
            'Lesotho',
            'Lettonie',
            'Liban',
            'Liberia',
            'Libye',
            'Liechtenstein',
            'Lituanie',
            'Luxembourg',
            'Macédoine',
            'Madagascar',
            'Malaisie',
            'Malawi',
            'Maldives',
            'Mali',
            'Malte',
            'Maroc',
            'Marshall',
            'Maurice',
            'Mauritanie',
            'Mexique',
            'Micronésie',
            'Moldavie',
            'Monaco',
            'Mongolie',
            'Mozambique',
            'Namibie',
            'Nauru',
            'Népal',
            'Nicaragua',
            'Niger',
            'Nigeria',
            'Niue',
            'Norvège',
            'Nouvelle-Zélande',
            'Oman',
            'Ouganda',
            'Ouzbékistan',
            'Pakistan',
            'Panama',
            'Paraguay',
            'Pays-Bas',
            'Pérou',
            'Philippines',
            'Pologne',
            'Portugal',
            'Qatar',
            'Roumanie',
            'Royaume-Uni',
            'Russie',
            'Rwanda',
            'Salomon',
            'Salvador',
            'Sénégal',
            'Seychelles',
            'Sierra Leone',
            'Singapour',
            'Slovaquie',
            'Slovénie',
            'Somalie',
            'Soudan',
            'Sri Lanka',
            'Suède',
            'Suisse',
            'Suriname',
            'Swaziland',
            'Syrie',
            'Tadjikistan',
            'Tanzanie',
            'Tchad',
            'Thaïlande',
            'Togo',
            'Tonga',
            'Trinité-et-Tobago',
            'Tunisie',
            'Turkménistan',
            'Turquie',
            'Tuvalu',
            'Ukraine',
            'Uruguay',
            'Vanuatu',
            'Venezuela',
            'Viêt Nam',
            'Yémen',
            'Yougoslavie',
            'Zaïre',
            'Zambie',
            'Zimbabwe'];

        let cleanArray = function (array) {
            var i, j, len = array.length, out = [], obj = {};
            for (i = 0; i < len; i++) {
                obj[array[i]] = 0;
            }
            for (j in obj) {
                out.push(j);
            }
            return out;
        };

        vm.event = {};
        vm.event.details = {};
        let villeT = [];

        for (var i = 0; i < Evenements.find({}).count(); i++) {
            villeT.push(Evenements.find({}).fetch()[i].ville);
        }
        vm.ville = cleanArray(villeT);
        //console.log(vm.ville);
        if (eventAM) {
            vm.event = eventAM;
            /*vm.event._id = eventAM._id;
             vm.event.details.firstname = eventAM.details.firstname;
             vm.event.details.lastname = eventAM.details.lastname;
             vm.event.ville = eventAM.ville;
             vm.event.date = eventAM.date;
             vm.event.base64 = eventAM.base64;*/
            vm.title = "Update";
            vm.button = "Update";
        } else {
            vm.event.details.firstname = "";
            vm.event.details.lastname = "";
            vm.event.ville = "";
            vm.event.date = "";
            vm.event.base64 = "";
            vm.event.state = "";
            vm.title = "Ajout";
            vm.button = "Ajouter";
        }

        /*vm.hide = function () {
         $mdDialog.hide();
         };*/
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
    }
}
