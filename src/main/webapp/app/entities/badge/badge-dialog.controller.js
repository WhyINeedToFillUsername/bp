(function() {
    'use strict';

    angular
        .module('bp250App')
        .controller('BadgeDialogController', BadgeDialogController);

    BadgeDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Badge', 'User', 'TypeOfBadge'];

    function BadgeDialogController ($scope, $stateParams, $uibModalInstance, entity, Badge, User, TypeOfBadge) {
        var vm = this;
        vm.badge = entity;
        vm.users = User.query();
        vm.typeofbadges = TypeOfBadge.query();
        vm.load = function(id) {
            Badge.get({id : id}, function(result) {
                vm.badge = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('bp250App:badgeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.badge.id !== null) {
                Badge.update(vm.badge, onSaveSuccess, onSaveError);
            } else {
                Badge.save(vm.badge, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.earnedAt = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
