(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('FlatDialogController', FlatDialogController);

    FlatDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Flat', 'User'];

    function FlatDialogController ($scope, $stateParams, $uibModalInstance, $q, entity, Flat, User) {
        var vm = this;
        vm.flat = entity;
        vm.flats = Flat.query();
        vm.users = User.query();
        vm.load = function(id) {
            Flat.get({id : id}, function(result) {
                vm.flat = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('bp250App:flatUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.flat.id !== null) {
                Flat.update(vm.flat, onSaveSuccess, onSaveError);
            } else {
                Flat.save(vm.flat, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateCreated = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
