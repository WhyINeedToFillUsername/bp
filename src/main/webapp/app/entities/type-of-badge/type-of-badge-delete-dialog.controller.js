(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('TypeOfBadgeDeleteController',TypeOfBadgeDeleteController);

    TypeOfBadgeDeleteController.$inject = ['$uibModalInstance', 'entity', 'TypeOfBadge'];

    function TypeOfBadgeDeleteController($uibModalInstance, entity, TypeOfBadge) {
        var vm = this;
        vm.typeOfBadge = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            TypeOfBadge.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
