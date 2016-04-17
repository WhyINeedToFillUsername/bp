(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('TypeOfChoreController', TypeOfChoreController);

    TypeOfChoreController.$inject = ['$scope', '$state', 'TypeOfChore'];

    function TypeOfChoreController ($scope, $state, TypeOfChore) {
        var vm = this;
        vm.typeOfChores = [];
        vm.loadAll = function() {
            TypeOfChore.query(function(result) {
                vm.typeOfChores = result;
            });
        };

        vm.loadAll();
        
    }
})();
