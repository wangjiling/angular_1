app.controller('ClearingFinanceCtrl', ['$scope', '$log', '$filter', 'clearing', 'common',
    function($scope, $log, $filter, clearing, common) {
        $log.debug('ClearingFinanceCtrl start...');
        $scope.cf = {
            checkF: false,//选择标志
            checkAllF: false,//全选标志
            checkbox: {},//批量选择
            financeItems: [],//媒体列表
            queryParams:{},
            pagination: {
                numPerPage: 20,
                maxSize: 5,
                bigTotalItems: 0,
                bigCurrentPage: 1
            }//分页
        };

        //获取理财清算列表
        var getFinanceList = function(cb){
            /*clearing.auditList({
                page: $scope.cf.pagination.bigCurrentPage,
                size: $scope.cf.pagination.numPerPage,
                productName: $scope.cf.productName||null,
                projectCode: $scope.cf.projectCode||null,
                startMaturityDate: $scope.cf.startMaturityDate?new Date($scope.cf.startMaturityDate).setHours(0,0,0,0):null,
                endMaturityDate: $scope.cf.endMaturityDate?new Date($scope.cf.endMaturityDate).setHours(0,0,0,0):null
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0 && response.data){
                    $scope.cf.financeItems = response.data.list||[];
                    $scope.cf.pagination.bigTotalItems = response.data.total|| 0;
                    //初始化checkbox
                    $scope.cf.checkbox = {};
                    angular.forEach($scope.cf.financeItems, function(item,i){
                        $scope.cf.checkbox[item.id] = {};
                        $scope.cf.checkbox[item.id].flag = false;
                        $scope.cf.checkbox[item.id].item = item;
                    });
                }
            }).finally(function(){
            });*/
        };

        //初始化日期插件
        var initDate= function(){
            /*common setting ------------->start*/
            $scope.cf.dateOptions  = {
                //customClass: getDayClass,
                //dateDisabled: disabled,
                showWeeks: false,
                formatYear: 'yy',
                maxDate: new Date(2050, 12, 31),
                minDate: new Date(2000, 12, 31),
                //startingDay: 1
            };

            //禁止选择周末
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.cf.formats = ['yyyy-MM-dd', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.cf.format = $scope.cf.formats[0];

            //设置明后天样式
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.cf.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i = 0; i < $scope.cf.events.length; i++) {
                        var currentDay = new Date($scope.cf.events[i].date).setHours(0,0,0,0);

                        if (dayToCheck === currentDay) {
                            return $scope.cf.events[i].status;
                        }
                    }
                }

                return '';
            }
            /*common setting ------------->end*/

            /*定制化设置 ---------------start>*/
            //设置为今天
            $scope.cf.today = function () {
                $scope.cf.startFundraisingDate = new Date();
                $scope.cf.endFundraisingDate = new Date();
                $scope.cf.startMaturityDate = new Date();
                $scope.cf.endMaturityDate = new Date();
            };
            //$scope.cf.today();

            $scope.cf.datepickerNum = 2;
            for(var i=0; i<$scope.cf.datepickerNum; i++){
                $scope.cf['popup'+i] = {
                    opened: false
                };
                (function(i){
                    $scope.cf['dateOpen'+i] = function() {
                        $scope.cf['popup'+i].opened = true;
                    };
                })(i);
            }
            /*定制化设置 ---------------end>*/
        };

        //初始化页面
        $scope.cf.init = function(){
            getFinanceList();
            initDate();
        };
        $scope.cf.init();

        //分页
        $scope.cf.pagination.setPage = function (pageNo) {
            $scope.cf.pagination.bigCurrentPage = pageNo;
        };
        $scope.cf.pagination.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.cf.pagination.bigCurrentPage);
            getFinanceList();
        };

        //check 用户是否有选择
        var checkboxCheck = function(){
            var checkF = false;
            angular.forEach($scope.cf.checkbox, function(val, key){
                if(val.flag==true){
                    checkF = true;
                    return false
                }
            });
            return checkF;
        };

        //全选事件处理
        $scope.cf.checkAllClick = function(){
            $scope.cf.checkAllF = !$scope.cf.checkAllF;

            if($scope.cf.checkAllF && $scope.cf.financeItems.length>0){
                $scope.cf.checkF = true;
                angular.forEach($scope.cf.checkbox, function(val, key){
                    $scope.cf.checkbox[key].flag=true;
                });
            }else{
                $scope.cf.checkF = false;
                angular.forEach($scope.cf.checkbox, function(val, key){
                    $scope.cf.checkbox[key].flag=false;
                });
            }
        };

        //单个复选框改变事件处理
        $scope.cf.checkChange = function(){
            $scope.cf.checkAllF = false;
            $scope.cf.checkF = checkboxCheck();
        };

        //查询
        $scope.cf.queryFinance = function(){
            $scope.cf.pagination.bigCurrentPage = 1;
            getFinanceList();
        };

        //下载出款明细
        $scope.cf.downloadOutDetail = function(){
        };

        //重置
        $scope.cf.reset = function(){
            $scope.cf.productName = null;
            $scope.cf.projectCode = null;
            $scope.cf.partner = null;
            $scope.cf.proStatus = null;
            $scope.cf.startFundraisingDate = null;
            $scope.cf.endFundraisingDate = null;
            $scope.cf.startMaturityDate = null;
            $scope.cf.endMaturityDate = null;
            $scope.cf.queryFinance();
        };
    }]);