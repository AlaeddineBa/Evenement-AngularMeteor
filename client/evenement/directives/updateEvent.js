angular.module('event').directive('updateEvent', function(){
    return {
        restrict: 'E',
        template: '<button class="btn btn-raised btn-info" ng-click="updateEvent(editEvent)" ui-sref="accueilEvent">Update</button>',
        controller: function($scope, $meteor){
            $scope.updateEvent = function(editEvent){
                $meteor.call('updateEvent', editEvent);
            }
        }
    }
});
