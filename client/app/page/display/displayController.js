angular
    .module('event')
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('altTheme')
            .primaryPalette('purple');
    })
    .controller('displayController', displayController);

displayController.$inject = ['$reactive', '$scope', '$mdDialog'];

function displayController($reactive, $scope, $mdDialog) {

    $reactive(this).attach($scope);
    var vm = this;

    vm.deleteEvent = deleteEvent;
    vm.showConfirm = showConfirm;
    vm.showAdd = showAdd;
    vm.searchfilter = searchfilter;
    vm.groupFilter = groupFilter;
    vm.returnImage = returnImage;

    vm.subscribe('evenements');
    vm.subscribe('images');

    //console.log(Meteor.user());

    vm.helpers({
        evenements: () => Evenements.find({}),
        groups: () => {
            if (vm.evenements){
                return groupBy('ville', vm.getReactively('evenements'));
            }
        }
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
        // TODO: Animation

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
                clickOutsideToClose: true,
                templateUrl: 'client/app/page/display/addEvent-popup.html',
                targetEvent: ev

            })
            .then(function (event) {
                console.log(event.image);
                if (eventAM) {
                    if (event.image) {
                        Images.insert(event.image, (err, fileObj) => {
                            event.idImage = fileObj._id;
                            Meteor.call('updateEvent', event);
                            console.log("updateEvent 1 ");
                        });
                    } else {
                        Meteor.call('updateEvent', event);
                        console.log("updateEvent 2 ");
                    }
                    toastr.success("Evenement modifié");

                } else {
                    let villeV = [];
                    if (event.image) {
                        Images.insert(event.image, (err, fileObj) => {
                            event.idImage = fileObj._id;
                            Meteor.call('insertEvent', event);
                            console.log("insertEvent 1 ");
                        });
                    } else {
                        Meteor.call('insertEvent', event);
                        console.log("insertEvent 2 ");
                    }

                    Villes.find({}).forEach(function (a) {
                        villeV.push(a.name);
                    });
                    if (villeV.indexOf(event.ville) == -1) {
                        Meteor.call('insertVille', event.ville);
                    }

                    toastr.success("Evenement ajouté");
                }
            }, function () {
                if (eventAM) {
                    toastr.warning("Evenement non modifié");
                } else {
                    toastr.warning("Evenement non ajouté");
                }
            });
    }

    function sortOn(collection, name) {
        collection.sort(
            function (a, b) {
                if (a[name] <= b[name]) {
                    return ( -1 );
                }
                return ( 1 );
            }
        );
    }
    function returnImage(id) {
        return Images.findOne({_id: id});
    }

    function groupBy(attribute, list) {
        var groups = [];
        sortOn(list, attribute);

        let groupValue = "_INVALID_GROUP_VALUE_";

        for (var i = 0; i < list.length; i++) {
            let eventF = {
                _id: list[i]._id,
                firstname: list[i].firstname,
                lastname: list[i].lastname,
                date: list[i].date,
                ville: list[i].ville,
                idImage: list[i].idImage,
                image: returnImage(list[i].idImage),
                /*base64: list[i].base64,*/
                state: list[i].state
            };
            // Should we create a new group?
            if (eventF[attribute] !== groupValue) {
                var group = {
                    label: eventF[attribute],
                    events: []
                };
                groupValue = group.label;
                groups.push(group);

            }

            group.events.push(eventF);
        }
        return groups;
    };

    function groupFilter(groupitem) {
        if (!vm.recherche) {
            return true;
        } else {
            for (let i = 0; i < groupitem.events.length; i++) {
                if (searchfilter(groupitem.events[i])) {
                    return true;
                }
            }
        }
        return false;
    }

    function searchfilter(eventItem) {

        let match = false;
        if (!vm.recherche) {
            return true;
        } else {
            var query = vm.recherche.split(" ");
            if (query[1]) {
                bool1 = false;
                bool2 = false;
                if ((eventItem.firstname.indexOf(query[0]) > -1) && (eventItem.lastname.indexOf(query[1]) > -1)) {
                    bool1 = true;
                } else if ((eventItem.firstname.indexOf(query[1]) > -1) && (eventItem.lastname.indexOf(query[0]) > -1)) {
                    bool2 = true;
                }
                else {
                    match = false;
                }

                match = bool1 || bool2;
            } else if (query[0]) {
                if ((eventItem.firstname.indexOf(query[0]) > -1) || (eventItem.lastname.indexOf(query[0]) > -1)) {
                    match = true;
                }
                else
                    match = false;
            }
        }
        return match;
    }

    function DialogController($mdDialog, eventAM) {
        $reactive(this).attach($scope);
        let vm = this;
        vm.subscribe('villes');
        vm.addImages = addImages;

        function addImages(files) {
            if (files.length > 0) {
                let reader = new FileReader();
                    console.log(reader);
                vm.event.image = files[0];
                reader.onload = (e) => {
                    $scope.$apply(() => {
                        vm.cropImgSrc = e.target.result;
                        console.log("e");
                        console.log(e);
                        vm.myCroppedImage = '';
                    });
                };
                reader.readAsDataURL(files[0]);
            }
            else {
                vm.cropImgSrc = undefined;
            }
        }


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

        vm.event = {};

        vm.helpers({
            ville: () => Villes.find({}),
        });

        /*Villes.find({}).forEach(function (a) {
            villeT.push(a.name);
        });*/

        if (eventAM) {
            vm.ajout_modif = false;
            vm.imageAffiche = returnImage(eventAM.idImage);
            vm.event = {
                _id: eventAM._id,
                firstname: eventAM.firstname,
                lastname: eventAM.lastname,
                date: eventAM.date,
                ville: eventAM.ville,
                idImage: eventAM.idImage,
                //base64: eventAM.base64,
                state: eventAM.state
            }
            vm.title = "Update";
            vm.button = "Update";
        } else {
            vm.ajout_modif = true;
            vm.event.firstname = "";
            vm.event.lastname = "";
            vm.event.ville = "";
            vm.event.date = "";
            //vm.event.base64 = "";
            vm.idImage = "";
            vm.event.state = "";

            vm.title = "Ajout";
            vm.button = "Ajouter";
        }

        vm.cancel = function () {
            $mdDialog.cancel();
        };
        vm.answer = function (event) {
            $mdDialog.hide(event);
        };
    }
}
