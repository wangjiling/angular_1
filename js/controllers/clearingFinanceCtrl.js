app.controller('ClearingFinanceCtrl', ['$scope', '$log', '$filter', 'clearing','CONFIG', 'utility',
    function($scope, $log, $filter, clearing, CONFIG, utility) {
        $log.debug('ClearingFinanceCtrl start...');
        /*list*/
        $scope.cf = {
            checkF: false,//选择标志
            checkAllF: false,//全选标志
            checkbox: {},//批量选择
            financeItems: [],//媒体列表
            queryParams:{},
            partnerList:[
                {id:0, name:'-请选择-'},
                {id:1, name:'网金'},
                {id:2, name:'PPP'},
                {id:4, name:'新手标'}
            ],//合作方列表
            proStatusList: [
                {id:0, name:'-请选择-'},
                {id:1, name:'募集中'},
                {id:2, name:'募集结束'},
                {id:3, name:'募集成功'},
                {id:4, name:'等待放款审核'},
                {id:5, name:'放款中'},
                {id:6, name:'放款成功'},
                {id:7, name:'等待回款审核'},
                {id:8, name:'回款中'},
                {id:9, name:'已完结'},
                {id:10, name:'募集失败'},
                {id:11, name:'批量退款中'},
                {id:12, name:'已终止 '},
                {id:18, name:'等待退款审核'}
            ],//PPP产品进度状态列表
            proWjStatusList: [
                {id:0, name:'-请选择-'},
                {id:1, name:'募集中'},
                {id:2, name:'募集结束'},
                {id:3, name:'募集成功'},
                {id:9, name:'已完结'}
            ],//网金产品进度状态列表
            pagination: {
                numPerPage: 20,
                maxSize: 5,
                bigTotalItems: 0,
                bigCurrentPage: 1
            }//分页
        };

        //获取理财清算列表
        var getFinanceList = function(cb){
            clearing.auditList({
                page: $scope.cf.pagination.bigCurrentPage,
                size: $scope.cf.pagination.numPerPage,
                productName: $scope.cf.productName||null,
                projectCode: $scope.cf.projectCode||null,
                bizCooperator: $scope.cf.partner&&$scope.cf.partner.id?$scope.cf.partner.id:null,
                status: $scope.cf.proStatus&&$scope.cf.proStatus.id?$scope.cf.proStatus.id:null,
                startFundraisingDate: $scope.cf.startFundraisingDate?new Date($scope.cf.startFundraisingDate).setMilliseconds(0):null,
                endFundraisingDate: $scope.cf.endFundraisingDate?new Date($scope.cf.endFundraisingDate).setMilliseconds(0):null,
                startMaturityDate: $scope.cf.startMaturityDate?new Date($scope.cf.startMaturityDate).setHours(0,0,0,0):null,
                endMaturityDate: $scope.cf.endMaturityDate?new Date($scope.cf.endMaturityDate).setHours(0,0,0,0):null
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0 && response.data){
                    $scope.cf.queryParams = {
                        productName: $scope.cf.productName||null,
                        projectCode: $scope.cf.projectCode||null,
                        bizCooperator: $scope.cf.partner&&$scope.cf.partner.id?$scope.cf.partner.id:null,
                        status: $scope.cf.proStatus&&$scope.cf.proStatus.id?$scope.cf.proStatus.id:null,
                        startFundraisingDate: $scope.cf.startFundraisingDate?new Date($scope.cf.startFundraisingDate).setMilliseconds(0):null,
                        endFundraisingDate: $scope.cf.endFundraisingDate?new Date($scope.cf.endFundraisingDate).setMilliseconds(0):null,
                        startMaturityDate: $scope.cf.startMaturityDate?new Date($scope.cf.startMaturityDate).setHours(0,0,0,0):null,
                        endMaturityDate: $scope.cf.endMaturityDate?new Date($scope.cf.endMaturityDate).setHours(0,0,0,0):null
                    };

                    //下载出款明细地址生成
                    var downloadParams = '';
                    angular.forEach($scope.cf.queryParams, function(val, key){
                        if(val){
                            downloadParams += '&'+key+'='+val;
                        }
                    });
                    $scope.cf.downloadUrl = CONFIG.host + '/api/financing/download_outmoneydetail?hashCode='+utility.getCookie('authtoken');
                    if(downloadParams){
                        $scope.cf.downloadUrl = CONFIG.host + '/api/financing/download_outmoneydetail?hashCode='+utility.getCookie('authtoken') + downloadParams;
                    }

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
                        $scope.cf.userRole = 'm1';
                    }else if(userRoles.indexOf('m2') !== -1){
                        $scope.cf.userRole = 'm2';
                    }
                }
            })
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

        //初始化日期时间插件
        var initDateTime= function(){
            for(var i=0; i<2; i++){
                $scope.cf['picker'+(i+1)] = {
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

            $scope.cf.openCalendar = function(e, picker) {
                $scope.cf[picker].open = true;
            };
        };

        $scope.cf.init = function(){
            getFinanceList(function(){
            });
            getRole();
            initDate();
            initDateTime();
        };
        $scope.cf.init();

        /*分页*/
        $scope.cf.pagination.setPage = function (pageNo) {
            $scope.cf.pagination.bigCurrentPage = pageNo;
        };
        $scope.cf.pagination.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.cf.pagination.bigCurrentPage);
            getFinanceList();
        };

        /*check 用户是否有选择*/
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

        //选择合作方事件处理
        $scope.cf.partnerClick = function(){
        };
        //选择产品进度事件处理
        $scope.cf.proStatusClick = function(){
        };

        //查询
        $scope.cf.queryFinance = function(){
            $scope.cf.pagination.bigCurrentPage = 1;
            getFinanceList(function(){
            });
        };

        //下载出款明细
        $scope.cf.downloadOutDetail = function(){
            if($scope.cf.financeItems.length==0) return;
            //clearing.downloadOutDetail($scope.cf.queryParams).then(function(response){
            //    response = response.data;
            //    if (response && response.status == 0){
            //
            //    }
            //})
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

        /*操作*/
        //统计金额
        $scope.cf.statistic = function(productCode, productName){
            clearing.statisticsAmount({
                productCode: productCode
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0 && response.data){
                    if(response.data.has_wait_return == 0){
                        var product = response.data.product_process;
                    }else if(response.data.has_wait_return == 1){
                    }
                }
            }).finally(function(){
            });
        };
        //确认募集状态
        $scope.cf.confirmRaise = function(productCode, productName, bizCooperator, progressId){
            if(bizCooperator == 1){//网金
            }else if(bizCooperator != 1){//PPP
            }
        };

        //优惠券充值
        $scope.cf.payCoupons = function(productCode, discountAmount){
        };
        //批量优惠券充值
        $scope.cf.payCouponsBatch = function(){
            if(!$scope.cf.checkF) return;
            //判断是否有不满足条件的产品
            var codeArray = [],
                flag = false,
                totalDiscountAmount = 0;
            angular.forEach($scope.cf.checkbox, function(val, key){
                var item = val.item;
                if(val.flag){
                    totalDiscountAmount += parseFloat(item.discountAmount);
                    if(!(item.bizCooperator==2&&item.status==3&&item.subsidyFlag==0)){
                        flag = true;
                        return false;
                    }else{
                        codeArray.push(item.productCode);
                    }
                }
            });
            if(flag){
            }else{
            }
        };

        //申请放款
        $scope.cf.applyLoan = function(progressId, productCode){
            //获取银行帐户信息
            clearing.receiptBankAccount({
                productId: productCode
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0){
                    var bankInfo = response.data;
                }
            });
        };

        //申请批量放款
        $scope.cf.applyLoanBatch = function(){
            if(!$scope.cf.checkF) return;
            //判断是否有不满足条件的产品
            var idArray = [],
                flag = false;
            angular.forEach($scope.cf.checkbox, function(val, key){
                var item = val.item;
                if(val.flag){
                    if(!(item.bizCooperator==2&&item.status==3&&item.subsidyFlag==1)){
                        flag = true;
                        return false;
                    }else{
                        idArray.push(item.id);
                    }
                }
            });
            if(flag){
            }else{
                if(idArray.length>0){
                    clearing.batchApplyLoan({
                        'ids': idArray.join(',')
                    }).then(function(response){
                        response = response.data;
                        if (response && response.status == 0){
                            getFinanceList();
                        }
                    });
                }
            }
        };

        //放款审核
        $scope.cf.approveLoan = function(productCode, productName, progressId){
            //获取银行帐户信息
            clearing.receiptBankAccount({
                productId: productCode
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0){
                    var bankInfo = response.data;
                }
            });
        };
        //批量放款审核
        $scope.cf.approveLoanBatch = function(){
            if(!$scope.cf.checkF) return;
            //判断是否有不满足条件的产品
            var idArray = [],
                flag = false,
                totalRaiseAmount = 0;
            angular.forEach($scope.cf.checkbox, function(val, key){
                var item = val.item;
                if(val.flag){
                    totalRaiseAmount += parseFloat(item.raiseAmount);
                    if(!(item.bizCooperator==2&&item.status==4)){
                        flag = true;
                        return false;
                    }else{
                        idArray.push(item.id);
                    }
                }
            });
            if(flag){
            }else{
            }
        };

        //查看清算指令
        $scope.cf.showProgressInstruct = function(productCode){
        };
        //重发指令
        $scope.cf.resendInstruct = function(progressId){
            clearing.resendInstruct({
                progressId: progressId
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0 && response.data){
                    getFinanceList();
                }
            })
        };
        //申请回款
        $scope.cf.applyRecycle = function(progressId){
            clearing.applyRecycle({
                progressId: progressId
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0){
                    getFinanceList();
                }
            })
        };
        //申请批量回款
        $scope.cf.applyRecycleBatch = function(){
            if(!$scope.cf.checkF) return;
            //判断是否有不满足条件的产品
            var idArray = [],
                flag = false;
            angular.forEach($scope.cf.checkbox, function(val, key){
                var item = val.item;
                if(val.flag){
                    if(!(item.bizCooperator==2&&item.status==6&&item.canReturnMoney==1)){
                        flag = true;
                        return false;
                    }else{
                        idArray.push(item.id);
                    }
                }
            });
            if(flag){
            }else{
                if(idArray.length>0){
                    clearing.applyRecycleBatch({
                        'ids': idArray.join(',')
                    }).then(function(response){
                        response = response.data;
                        if (response && response.status == 0){
                            getFinanceList();
                        }
                    });
                }
            }
        };

        //回款审核
        $scope.cf.approveReturnMoney = function(progressId){
        };
        //批量回款审核
        $scope.cf.approveReturnMoneyBatch = function(){
            if(!$scope.cf.checkF) return;
            //判断是否有不满足条件的产品
            var idArray = [],
                flag = false;
            angular.forEach($scope.cf.checkbox, function(val, key){
                var item = val.item;
                if(val.flag){
                    if(!(item.bizCooperator==2&&item.status==7)){
                        flag = true;
                        return false;
                    }else{
                        idArray.push(item.id);
                    }
                }
            });
            if(flag){
            }else{
            }
        };

        //申请退款
        $scope.cf.applyRefund = function(progressId){
            clearing.applyRefund({
                progressId: progressId
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0){
                    getFinanceList();
                }
            })
        };
    }]);