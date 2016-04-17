(function() {
    'use strict';
    angular
        .module('bp250App')
        .factory('Flat', Flat);

    Flat.$inject = ['$resource', 'DateUtils'];

    function Flat ($resource, DateUtils) {
        var resourceUrl =  'api/flats/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateCreated = DateUtils.convertLocalDateFromServer(data.dateCreated);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateCreated = DateUtils.convertLocalDateToServer(data.dateCreated);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateCreated = DateUtils.convertLocalDateToServer(data.dateCreated);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
