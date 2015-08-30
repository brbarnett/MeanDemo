(function() {
    'use strict;'

    angular.module('app').controller('HomeController', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
        var self = this;

        self.helloWorld = 'Hello world';
    }]);
})();