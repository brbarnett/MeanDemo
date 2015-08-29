(function() {
    'use strict;'

    angular.module('app').controller('HomeController', ['Restangular', 'settings', '$scope', '$state', '$timeout', function(Restangular, settings, $scope, $state, $timeout) {
        var self = this;

        self.helloWorld = 'Hello world';
    }]);
})();