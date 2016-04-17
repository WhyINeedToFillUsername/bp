(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Event', 'User', 'Chore'];

    function EventDetailController($scope, $rootScope, $stateParams, entity, Event, User, Chore) {
        var vm = this;
        vm.event = entity;
        vm.load = function (id) {
            Event.get({id: id}, function(result) {
                vm.event = result;
            });
        };
        var unsubscribe = $rootScope.$on('bp250App:eventUpdate', function(event, result) {
            vm.event = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
