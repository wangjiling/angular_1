app.controller('ClearingExperienceCtrl', ['$scope', '$log', 'clearing',
    function($scope, $log, clearing) {
        $log.debug('ClearingExperienceCtrl start...');
        $scope.ce = {
            allReturnMoney: 0,//累计可回款总金额
            checkF: false,//选择标志
            checkAllF: false,//全选标志
            checkbox: {},//批量选择
            financeItems: [],//清算列表
            queryParams:{},
            pagination: {
                numPerPage: 20,
                maxSize: 5,
                bigTotalItems: 0,
                bigCurrentPage: 1
            }//分页
        };

        //获取理财清算列表
        var getExpFinanceList = function(){
            /*clearing.experienceAuditList({
                page: $scope.ce.pagination.bigCurrentPage,
                size: $scope.ce.pagination.numPerPage,
                orderId: $scope.ce.orderId||null,
                projectCode: $scope.ce.projectCode||null,
                productName: $scope.ce.productName||null
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0 && response.data){
                    $scope.ce.checkAllF = false;
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
            });*/
        };

        //初始化页面
        $scope.ce.init = function(){
            getExpFinanceList();
        };
        $scope.ce.init();

        //分页
        $scope.ce.pagination.setPage = function (pageNo) {
            $scope.ce.pagination.bigCurrentPage = pageNo;
        };
        $scope.ce.pagination.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.ce.pagination.bigCurrentPage);
            getExpFinanceList();
        };

        //check 用户是否有选择
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
            getExpFinanceList();
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
    }]);