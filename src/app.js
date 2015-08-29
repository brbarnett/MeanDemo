(function () {
    'use strict;'

    angular.module('app',
        [
            'ng',
            'restangular',
            'ui.router',
            //'LocalStorageModule',
            //'matchmedia-ng',
            //'SignalR',
            //'ui.bootstrap'
        ])
        .config(
        [
            'RestangularProvider',
            '$urlRouterProvider',
            //'localStorageServiceProvider',
            '$httpProvider',
            function (RestangularProvider, $urlRouterProvider, $httpProvider) {
                RestangularProvider.setBaseUrl('/api');
                $urlRouterProvider.otherwise('/');
                //localStorageServiceProvider.setStorageType('localStorage');
                //localStorageServiceProvider.setPrefix('confRoom');

                $httpProvider.interceptors.push('requestInterceptor');
            }])
})();