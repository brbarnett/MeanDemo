(function () {
    'use strict;'

    angular.module('app',
        [
            'ng',
            //'restangular',
            'ui.router',
            //'LocalStorageModule',
            //'matchmedia-ng',
            //'SignalR',
            //'ui.bootstrap'
        ])
        .config(
        [
            '$urlRouterProvider',
            function ($urlRouterProvider) {
                //RestangularProvider.setBaseUrl('/api');
                $urlRouterProvider.otherwise('/');
                //localStorageServiceProvider.setStorageType('localStorage');
                //localStorageServiceProvider.setPrefix('confRoom');

                //$httpProvider.interceptors.push('requestInterceptor');
            }])
})();