app.controller('ClearingExperienceCtrl', ['$scope', '$log', '$filter', 'clearing',
    function($scope, $log, $filter, clearing) {
        $log.debug('ClearingExperienceCtrl start...');
        /*list*/
        $scope.ce = {
            allReturnMoney: 0,//累计可回款总金额
            checkF: false,//选择标志
            checkAllF: false,//全选标志
            checkbox: {},//批量选择
            financeItems: [],//清算列表
            queryParams:{},
            orderStatusList:[
                {id:-1, name:'-请选择-'},
                {id:0, name:'待支付'},
                {id:4, name:'交易关闭'},
                {id:6, name:'投资中'},
                {id:7, name:'回款中'},
                {id:8, name:'回款失败'},
                {id:9, name:'已回款'},
                {id:14, name:'等待回款结果'}
            ],//订单状态
            pagination: {
                numPerPage: 20,
                maxSize: 5,
                bigTotalItems: 0,
                bigCurrentPage: 1
            }//分页
        };

        //获取理财清算列表
        var getExpFinanceList = function(cb){
            clearing.experienceAuditList({
                page: $scope.ce.pagination.bigCurrentPage,
                size: $scope.ce.pagination.numPerPage,
                orderId: $scope.ce.orderId||null,
                projectCode: $scope.ce.projectCode||null,
                productName: $scope.ce.productName||null,
                status: $scope.ce.orderStatus&&$scope.ce.orderStatus.id!==-1?$scope.ce.orderStatus.id:null,
                startOrderCreated: $scope.ce.startOrderCreated?new Date($scope.ce.startOrderCreated).setMilliseconds(0):null,
                endOrderCreated: $scope.ce.endOrderCreated?new Date($scope.ce.endOrderCreated).setMilliseconds(0):null,
                startMaturityDate: $scope.ce.startMaturityDate?new Date($scope.ce.startMaturityDate).setHours(0,0,0,0):null,
                endMaturityDate: $scope.ce.endMaturityDate?new Date($scope.ce.endMaturityDate).setHours(0,0,0,0):null
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0 && response.data){
                    $scope.ce.checkAllF = false;
                    $scope.ce.queryParams = {
                        page: $scope.ce.pagination.bigCurrentPage,
                        size: $scope.ce.pagination.numPerPage,
                        orderId: $scope.ce.orderId||null,
                        projectCode: $scope.ce.projectCode||null,
                        productName: $scope.ce.productName||null,
                        status: $scope.ce.orderStatus&&$scope.ce.orderStatus.id?$scope.ce.orderStatus.id:null,
                        startOrderCreated: $scope.ce.startOrderCreated?new Date($scope.ce.startOrderCreated).setMilliseconds(0):null,
                        endOrderCreated: $scope.ce.endOrderCreated?new Date($scope.ce.endOrderCreated).setMilliseconds(0):null,
                        startMaturityDate: $scope.ce.startMaturityDate?new Date($scope.ce.startMaturityDate).setHours(0,0,0,0):null,
                        endMaturityDate: $scope.ce.endMaturityDate?new Date($scope.ce.endMaturityDate).setHours(0,0,0,0):null
                    };

                    $scope.ce.financeItems = response.data.list||[];
                    $scope.ce.pagination.bigTotalItems = response.data.total||0;
                    $scope.ce.allReturnMoney = response.data.allReturnMoney||0;
                    //初始化checkbox
                    $scope.ce.checkbox = {};
                    angular.forEach($scope.ce.financeItems, function(item,i){
                        $scope.ce.checkbox[item.orderId+','+item.status] = false;
                    });
                }
            }).finally(function(){
                cb && angular.isFunction(cb) && cb();
            });
        };

        //获取用户角色
        var getRole = function(){
            clearing.getRole({}).then(function(response){
                response = response.data;
                if (response && response.status == 0 && response.data){
                    var userRoles = response.data.role;
                    if(userRoles.indexOf('m1') !== -1){
                        $scope.ce.userRole = 'm1';
                    }else if(userRoles.indexOf('m2') !== -1){
                        $scope.ce.userRole = 'm2';
                    }
                }
            })
        };

        //初始化日期插件
        var initDate= function(){
            for(var i=0; i<4; i++){
                $scope.ce['picker'+(i+1)] = {
                    readonlyInput: false,
                    datepickerOptions: {
                        showWeeks: false,
                        maxDate: null
                    },
                    timepickerOptions: {
                        showMeridian: false,
                        showSeconds: true
                    },
                    buttonBar: {
                        show: true,
                        now: {
                            show: true,
                            text: '现在'
                        },
                        today: {
                            show: true,
                            text: '今天'
                        },
                        clear: {
                            show: true,
                            text: '清空'
                        },
                        date: {
                            show: true,
                            text: '日期'
                        },
                        time: {
                            show: true,
                            text: '时间'
                        },
                        close: {
                            show: true,
                            text: '确定'
                        }
                    }
                };
            }

            $scope.ce.openCalendar = function(e, picker) {
                $scope.ce[picker].open = true;
            };
        };

        $scope.ce.init = function(){
            getExpFinanceList(function(){
            });
            initDate();
        };
        $scope.ce.init();

        /*分页*/
        $scope.ce.pagination.setPage = function (pageNo) {
            $scope.ce.pagination.bigCurrentPage = pageNo;
        };
        $scope.ce.pagination.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.ce.pagination.bigCurrentPage);
            getExpFinanceList();
        };

        /*check 用户是否有选择*/
        var checkboxCheck = function(){
            var checkF = false;
            angular.forEach($scope.ce.checkbox, function(val, key){
                if(val==true){
                    checkF = true;
                    return false
                }
            });
            return checkF;
        };

        //全选事件处理
        $scope.ce.checkAllClick = function(){
            if($scope.ce.checkAllF){
                $scope.ce.checkF = true;
                angular.forEach($scope.ce.checkbox, function(val, key){
                    $scope.ce.checkbox[key]=true;
                });
            }else{
                $scope.ce.checkF = false;
                angular.forEach($scope.ce.checkbox, function(val, key){
                    $scope.ce.checkbox[key]=false;
                });
            }
        };

        //单个复选框改变事件处理
        $scope.ce.checkChange = function(){
            $scope.ce.checkAllF = false;
            $scope.ce.checkF = checkboxCheck();
        };

        //查询
        $scope.ce.queryFinance = function(){
            $scope.ce.pagination.bigCurrentPage = 1;
            getExpFinanceList(function(){            });
        };

        //重置
        $scope.ce.reset = function(){
            $scope.ce.orderId = null;
            $scope.ce.projectCode = null;
            $scope.ce.productName = null;
            $scope.ce.orderStatus = null;
            $scope.ce.startOrderCreated = null;
            $scope.ce.endOrderCreated = null;
            $scope.ce.startMaturityDate = null;
            $scope.ce.endMaturityDate = null;
            $scope.ce.queryFinance();
        };

        /*操作*/
        //批量回款
        $scope.ce.batchReturnMoney = function(oid){
            if(oid){
            }else{
                if(!$scope.ce.checkF) return;
            }
        };

        //全部回款
        $scope.ce.allReturnMoneyClick = function(){
            if($scope.ce.pagination.bigTotalItems==0) return;
        };
    }]);