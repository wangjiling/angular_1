app.controller('MediaListCtrl', ['$scope','$state','$log', 'operation', function($scope, $state, $log, operation) {
    'use strict';
    $log.debug('MediaListCtrl start...');

    /*list*/
    $scope.om = {
        searchF: false,//搜索标志
        checkF: false,//选择标志
        checkAllF: false,//全选标志
        checkbox: {},//批量选择
        mediaItems: [],//媒体列表
        pagination: {
            numPerPage: 20,
            maxSize: 5,
            bigTotalItems: 0,
            bigCurrentPage: 1
        }//分页
    };

    //获取媒体列表
    var getMediaList = function(){
        operation.newsList({
            page: $scope.om.pagination.bigCurrentPage,
            pageSize: $scope.om.pagination.numPerPage,
            orderColumn: null,
            keyword: $scope.om.searchInp||null
        }).then(function(response){
            response = response.data;
            if (response && response.status == 0 && response.data){
                $scope.om.mediaItems = response.data.dataList||[];
                $scope.om.pagination.bigTotalItems = response.data.total|| 0;
                //初始化checkbox
                $scope.om.checkbox = {};
                angular.forEach($scope.om.mediaItems, function(item,i){
                    $scope.om.checkbox[item.id] = false;
                });
            }
        });
    };

    /*check 用户是否有选择*/
    var checkboxCheck = function(){
        var checkF = false;
        angular.forEach($scope.om.checkbox, function(val, key){
            if(val==true){
                checkF = true;
                return false
            }
        });
        return checkF;
    };

    $scope.om.init = function(){
        getMediaList();
    };
    $scope.om.init();

    /*分页*/
    $scope.om.pagination.setPage = function (pageNo) {
        $scope.om.pagination.bigCurrentPage = pageNo;
    };
    $scope.om.pagination.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.om.pagination.bigCurrentPage);
        getMediaList();
    };

    //新闻置顶/取消置顶
    $scope.om.setTopClick = function(newsId, sort){
        if(sort>0){//取消置顶
            operation.offTopNews({
                newsId: newsId
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0){
                    getMediaList();
                }
            });
        }else{//置顶
            operation.topNews({
                newsId: newsId
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0){
                    getMediaList();
                }
            });
        }
    };
    //删除单个新闻
    $scope.om.delNewsClick = function(newsId){
    };
    //删除批量新闻
    $scope.om.delBatchNewsClick = function(){
        if(!$scope.om.checkF) return;
    };

    //全选事件处理
    $scope.om.checkAllClick = function(){
        if($scope.om.checkAllF){
            $scope.om.checkF = true;
            angular.forEach($scope.om.checkbox, function(val, key){
                $scope.om.checkbox[key]=true;
            });
        }else{
            $scope.om.checkF = false;
            angular.forEach($scope.om.checkbox, function(val, key){
                $scope.om.checkbox[key]=false;
            });
        }
    };

    //单个复选框改变事件处理
    $scope.om.checkChange = function(){
        $scope.om.checkAllF = false;
        $scope.om.checkF = checkboxCheck();
    };

    //搜索关键字
    $scope.om.searchNews = function(){
        if(!$scope.om.searchInp) return;
        $scope.om.searchF = true;
        $scope.om.pagination.setPage(1);
        getMediaList();
    };
    //取消关键字恢复默认列表
    $scope.om.searchInpChange = function(){
        if(!$scope.om.searchInp){
            $scope.om.searchF = false;
            $scope.om.pagination.setPage(1);
            getMediaList();
        }
    };
}]);