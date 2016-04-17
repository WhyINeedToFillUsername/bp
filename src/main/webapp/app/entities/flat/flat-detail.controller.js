(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('FlatDetailController', FlatDetailController);

    FlatDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Flat'];

    function FlatDetailController($scope, $rootScope, $stateParams, entity, Flat) {
        var vm = this;
        vm.flat = entity;
        vm.load = function (id) {
            Flat.get({id: id}, function(result) {
                vm.flat = result;
            });
        };
        var unsubscribe = $rootScope.$on('bp250App:flatUpdate', function(event, result) {
            vm.flat = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
