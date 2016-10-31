app.controller('AppCtrl', ['CONFIG', '$rootScope', '$scope', '$window', '$log', 'user', 'common', function(CONFIG, $rootScope, $scope, $window, $log, user, common) {
    'use strict';
    $log.debug('AppCtrl start...');

    $scope.bm = {
        headerNavList:[
            {
                name: '运营管理',
                sref: 'operation.funding_list',
                stateReg: 'operation',
                defaultClass: 'svg-houtai_nav_1_a-dims svg-houtai_nav_1_a',
                hoverClass: 'svg-houtai_nav_1_b-dims svg-houtai_nav_1_b',
                activeClass: 'svg-houtai_nav_1_c-dims svg-houtai_nav_1_c'
            },
            {
                name: '统计分析',
                sref: 'statistic_analysis',
                stateReg: 'statistic',
                defaultClass: 'svg-houtai_nav_2_a-dims svg-houtai_nav_2_a',
                hoverClass: 'svg-houtai_nav_2_b-dims svg-houtai_nav_2_b',
                activeClass: 'svg-houtai_nav_2_c-dims svg-houtai_nav_2_c'
            },
            {
                name: '推广营销',
                sref: 'brokerage.config',
                stateReg: 'brokerage',
                defaultClass: 'svg-houtai_nav_3_a-dims svg-houtai_nav_3_a',
                hoverClass: 'svg-houtai_nav_3_b-dims svg-houtai_nav_3_b',
                activeClass: 'svg-houtai_nav_3_c-dims svg-houtai_nav_3_c'
            },
            {
                name: '清算系统',
                sref: 'clearing.finance',
                stateReg: 'clearing',
                defaultClass: 'svg-houtai_nav6_a-dims svg-houtai_nav6_a',
                hoverClass: 'svg-houtai_nav6_b-dims svg-houtai_nav6_b',
                activeClass: 'svg-houtai_nav6_c-dims svg-houtai_nav6_c'
            },
            {
                name: '系统管理',
                sref: 'system_management',
                stateReg: 'system',
                defaultClass: 'svg-houtai_nav_4_a-dims svg-houtai_nav_4_a',
                hoverClass: 'svg-houtai_nav_4_b-dims svg-houtai_nav_4_b',
                activeClass: 'svg-houtai_nav_4_c-dims svg-houtai_nav_4_c'
            },
            {
                name: '我的账号',
                sref: 'my_account',
                stateReg: 'my',
                defaultClass: 'svg-houtai_nav_5_a-dims svg-houtai_nav_5_a',
                hoverClass: 'svg-houtai_nav_5_b-dims svg-houtai_nav_5_b',
                activeClass: 'svg-houtai_nav_5_c-dims svg-houtai_nav_5_c'
            }
        ]
    };

    //获取用户信息
    /*user.getUser().then(function(response){
        response = response.data;
        if (response && response.status == 0 && response.data){
            $scope.bm.userName = response.data.username;
        }
    });*/

    //注销
    $scope.bm.logout = function(){
        /*user.logoutUser().then(function(response){
            response = response.data;
            if (response && response.status == 0 ){
                common.delCookie('authtoken');
                $window.location.href = '#/login';
            }
        });*/

        //mockup
        $rootScope.userName = '';
        $window.location.href = '#/login';
    };

    //mockup
    if(!$rootScope.userName) $window.location.href = '#/login';
}]);