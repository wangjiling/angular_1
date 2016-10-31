'use strict';

var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap'
]).run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    ).constant('CONFIG', {
        host: ''
    });