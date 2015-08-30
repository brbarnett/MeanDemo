(function() {
    'use strict;'

    angular.module('app').config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('second', {
                url: '/second',
                templateUrl: 'second/second.html'
            });
    }])
})();