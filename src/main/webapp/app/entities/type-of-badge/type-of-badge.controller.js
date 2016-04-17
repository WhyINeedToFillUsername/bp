(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('TypeOfBadgeController', TypeOfBadgeController);

    TypeOfBadgeController.$inject = ['$scope', '$state', 'TypeOfBadge'];

    function TypeOfBadgeController ($scope, $state, TypeOfBadge) {
        var vm = this;
        vm.typeOfBadges = [];
        vm.loadAll = function() {
            TypeOfBadge.query(function(result) {
                vm.typeOfBadges = result;
            });
        };

        vm.loadAll();
        
    }
})();
