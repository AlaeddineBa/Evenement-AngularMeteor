angular
        .module('event')
        .directive('moreEvent', function() {
        return {
            restrict: 'E',
            templateUrl: 'client/views/more-event.html',
            controllerAs: 'moreEvent',
            controller: function($scope,$stateParams){
                var event = Evenements.findOne($stateParams.eventId);
                $scope.oneEvent = event;

            }
        }
    });
