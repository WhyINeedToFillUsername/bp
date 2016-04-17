(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('ChoreController', ChoreController);

    ChoreController.$inject = ['$scope', '$state', 'Chore'];

    function ChoreController ($scope, $state, Chore) {
        var vm = this;
        vm.chores = [];
        vm.loadAll = function() {
            Chore.query(function(result) {
                vm.chores = result;
            });
        };

        vm.loadAll();
        
    }
})();
