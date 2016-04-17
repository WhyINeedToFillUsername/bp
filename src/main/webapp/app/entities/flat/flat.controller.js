(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('FlatController', FlatController);

    FlatController.$inject = ['$scope', '$state', 'Flat'];

    function FlatController ($scope, $state, Flat) {
        var vm = this;
        vm.flats = [];
        vm.loadAll = function() {
            Flat.query(function(result) {
                vm.flats = result;
            });
        };

        vm.loadAll();
        
    }
})();
