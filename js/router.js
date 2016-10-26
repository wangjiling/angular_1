app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider
            .otherwise('/operation/fundings');

        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: 'views/login.html'
            })
            .state('operation', {
                url: '/operation',
                abstract: true,
                controller: 'OperationCtrl',
                templateUrl: 'views/operation/op_container.html'
            })
            .state('operation.funding_list', {
                url: '/fundings',
                controller: 'FundingListCtrl',
                params: {
                    route : [{
                        title:"众筹管理",
                        url: ""
                    }]
                },
                templateUrl: 'views/operation/op_funding_list.html'
            })
            .state('operation.media_list', {
                url: '/media/list',
                controller: 'MediaListCtrl',
                params: {
                    route : [{
                        title:"媒体中心",
                        url: ""
                    }]
                },
                templateUrl: 'views/operation/op_media_list.html'
            })
            //清算系统
            .state('clearing', {
                url: '/clearing',
                abstract: true,
                controller: 'ClearingCtrl',
                templateUrl: 'views/clearing/cs_container.html'
            })
            .state('clearing.finance', {
                url: '/finance',
                controller: 'ClearingFinanceCtrl',
                params: {
                    route : [{
                        title:"理财清算",
                        url: ""
                    }]
                },
                templateUrl: 'views/clearing/cs_finance.html'
            })
            .state('clearing.experience', {
                url: '/experience',
                controller: 'ClearingExperienceCtrl',
                params: {
                    route : [{
                        title:"体验标清算",
                        url: ""
                    }]
                },
                templateUrl: 'views/clearing/cs_experience.html'
            })
    }
]);