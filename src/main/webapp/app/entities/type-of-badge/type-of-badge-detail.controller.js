(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('TypeOfBadgeDetailController', TypeOfBadgeDetailController);

    TypeOfBadgeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TypeOfBadge'];

    function TypeOfBadgeDetailController($scope, $rootScope, $stateParams, entity, TypeOfBadge) {
        var vm = this;
        vm.typeOfBadge = entity;
        vm.load = function (id) {
            TypeOfBadge.get({id: id}, function(result) {
                vm.typeOfBadge = result;
            });
        };
        var unsubscribe = $rootScope.$on('bp250App:typeOfBadgeUpdate', function(event, result) {
            vm.typeOfBadge = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
