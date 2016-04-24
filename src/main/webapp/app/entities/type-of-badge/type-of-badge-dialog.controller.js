(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('TypeOfBadgeDialogController', TypeOfBadgeDialogController);

    TypeOfBadgeDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'TypeOfBadge'];

    function TypeOfBadgeDialogController ($scope, $stateParams, $uibModalInstance, entity, TypeOfBadge) {
        var vm = this;
        vm.typeOfBadge = entity;
        vm.load = function(id) {
            TypeOfBadge.get({id : id}, function(result) {
                vm.typeOfBadge = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('bp250App:typeOfBadgeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.typeOfBadge.id !== null) {
                TypeOfBadge.update(vm.typeOfBadge, onSaveSuccess, onSaveError);
            } else {
                TypeOfBadge.save(vm.typeOfBadge, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
