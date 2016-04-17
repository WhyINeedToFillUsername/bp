(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('ChoreDetailController', ChoreDetailController);

    ChoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Chore', 'TypeOfChore', 'User'];

    function ChoreDetailController($scope, $rootScope, $stateParams, entity, Chore, TypeOfChore, User) {
        var vm = this;
        vm.chore = entity;
        vm.load = function (id) {
            Chore.get({id: id}, function(result) {
                vm.chore = result;
            });
        };
        var unsubscribe = $rootScope.$on('bp250App:choreUpdate', function(event, result) {
            vm.chore = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
