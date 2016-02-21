Meteor.subscribe('evenements');
angular
        .module('event')
        .directive('editEvent', function(){
            return {
                restrict: 'E',
                templateUrl: 'client/views/edit-event.html',
                controller: function($scope,$stateParams){
                    var event = Evenements.findOne($stateParams.eventId);
                    $scope.editEvent = event;
                }
            }
        });

