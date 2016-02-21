angular
        .module('event')
        .directive('deleteEvent', function(){
            return {
                restrict: 'E',
                template: '<button  class="btn btn-raised btn-danger" ng-click="delete(oneEvent._id)" ui-sref="accueilEvent"> <i class="fa fa-trash-o"></i></button>',
                controller: function($scope, $meteor){
                    $scope.delete = function(id){
                        $meteor.call('removeEvent', id);
                    }
                }
            }
        });
