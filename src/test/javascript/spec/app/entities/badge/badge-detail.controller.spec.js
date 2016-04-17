'use strict';

describe('Controller Tests', function() {

    describe('Badge Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockBadge, MockUser, MockTypeOfBadge;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockBadge = jasmine.createSpy('MockBadge');
            MockUser = jasmine.createSpy('MockUser');
            MockTypeOfBadge = jasmine.createSpy('MockTypeOfBadge');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Badge': MockBadge,
                'User': MockUser,
                'TypeOfBadge': MockTypeOfBadge
            };
            createController = function() {
                $injector.get('$controller')("BadgeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'bp250App:badgeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
