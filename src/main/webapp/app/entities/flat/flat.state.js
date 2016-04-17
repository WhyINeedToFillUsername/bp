(function() {
    'use strict';

    angular
        .module('bp250App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('flat', {
            parent: 'entity',
            url: '/flat',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Flats'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/flat/flats.html',
                    controller: 'FlatController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('flat-detail', {
            parent: 'entity',
            url: '/flat/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Flat'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/flat/flat-detail.html',
                    controller: 'FlatDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Flat', function($stateParams, Flat) {
                    return Flat.get({id : $stateParams.id});
                }]
            }
        })
        .state('flat.new', {
            parent: 'flat',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/flat/flat-dialog.html',
                    controller: 'FlatDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                dateCreated: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('flat', null, { reload: true });
                }, function() {
                    $state.go('flat');
                });
            }]
        })
        .state('flat.edit', {
            parent: 'flat',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/flat/flat-dialog.html',
                    controller: 'FlatDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Flat', function(Flat) {
                            return Flat.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('flat', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('flat.delete', {
            parent: 'flat',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/flat/flat-delete-dialog.html',
                    controller: 'FlatDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Flat', function(Flat) {
                            return Flat.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('flat', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
