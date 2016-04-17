(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('TypeOfChoreDialogController', TypeOfChoreDialogController);

    TypeOfChoreDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'TypeOfChore'];

    function TypeOfChoreDialogController ($scope, $stateParams, $uibModalInstance, entity, TypeOfChore) {
        var vm = this;
        vm.typeOfChore = entity;
        vm.load = function(id) {
            TypeOfChore.get({id : id}, function(result) {
                vm.typeOfChore = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('bp250App:typeOfChoreUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.typeOfChore.id !== null) {
                TypeOfChore.update(vm.typeOfChore, onSaveSuccess, onSaveError);
            } else {
                TypeOfChore.save(vm.typeOfChore, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
