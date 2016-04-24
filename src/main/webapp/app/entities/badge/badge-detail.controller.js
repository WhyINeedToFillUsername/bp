(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('BadgeDetailController', BadgeDetailController);

    BadgeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Badge', 'TypeOfBadge', 'User'];

    function BadgeDetailController($scope, $rootScope, $stateParams, entity, Badge, TypeOfBadge, User) {
        var vm = this;
        vm.badge = entity;
        vm.load = function (id) {
            Badge.get({id: id}, function(result) {
                vm.badge = result;
            });
        };
        var unsubscribe = $rootScope.$on('bp250App:badgeUpdate', function(event, result) {
            vm.badge = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
