(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('TypeOfChoreDetailController', TypeOfChoreDetailController);

    TypeOfChoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TypeOfChore'];

    function TypeOfChoreDetailController($scope, $rootScope, $stateParams, entity, TypeOfChore) {
        var vm = this;
        vm.typeOfChore = entity;
        vm.load = function (id) {
            TypeOfChore.get({id: id}, function(result) {
                vm.typeOfChore = result;
            });
        };
        var unsubscribe = $rootScope.$on('bp250App:typeOfChoreUpdate', function(event, result) {
            vm.typeOfChore = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
