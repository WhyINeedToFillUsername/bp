(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('ChoreDialogController', ChoreDialogController);

    ChoreDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Chore', 'TypeOfChore', 'User'];

    function ChoreDialogController ($scope, $stateParams, $uibModalInstance, $q, entity, Chore, TypeOfChore, User) {
        var vm = this;
        vm.chore = entity;
        vm.isoftypes = TypeOfChore.query({filter: 'chore-is-null'});
        $q.all([vm.chore.$promise, vm.isoftypes.$promise]).then(function() {
            if (!vm.chore.isOfType || !vm.chore.isOfType.id) {
                return $q.reject();
            }
            return TypeOfChore.get({id : vm.chore.isOfType.id}).$promise;
        }).then(function(isOfType) {
            vm.isoftypes.push(isOfType);
        });
        vm.users = User.query();
        vm.load = function(id) {
            Chore.get({id : id}, function(result) {
                vm.chore = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('bp250App:choreUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.chore.id !== null) {
                Chore.update(vm.chore, onSaveSuccess, onSaveError);
            } else {
                Chore.save(vm.chore, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.date = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
