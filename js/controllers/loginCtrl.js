app.controller('LoginCtrl', ['$rootScope', '$scope', '$log', '$state', function($rootScope, $scope, $log, $state) {
    'use strict';
    $log.debug('LoginCtrl start...');

    $scope.lg = {};

    $scope.lg.login = function(){
        if($scope.lg.phone && $scope.lg.password){
            $rootScope.userName = 'xxx';
            $state.go('operation.funding_list');
        }
    }
}]);