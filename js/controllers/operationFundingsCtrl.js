app.controller('FundingListCtrl', ['$scope','$state','$filter','$log','$window','operation', function($scope, $state,$filter, $log,$window,operation) {
    'use strict';
    $log.debug('FundingListCtrl start...');

    /*list*/
    $scope.of = {
        tabList: [
            {title: '待审核', num: 0, templateUrl: 'views/operation/op_fundings_waitreview.html'},
            {title: '待发布', num: 0, templateUrl: 'views/operation/op_fundings_waitpublish.html'},
            {title: '已发布', num: 0, templateUrl: 'views/operation/op_fundings_published.html'},
            {title: '已否决', num: 0, templateUrl: 'views/operation/op_fundings_rejected.html'},
            {title: '已下架', num: 0, templateUrl: 'views/operation/op_fundings_removed.html'}
        ],//众筹管理tab列表
        submitTimeF: 0,//项目按提交时间排序，0:默认，1：由近到远，2：由远到近
        passedTimeF: 0,//项目按通过时间排序，0:默认，1：由近到远，2：由远到近
        publishTimeF: 0,//项目按发布时间排序，0:默认，1：由近到远，2：由远到近
        auditTimeF: 0,//项目按审核时间排序，0:默认，1：由近到远，2：由远到近
        reviewStatusList: [
            {id:'0', name:'全部'},
            {id:'1', name:'待审核'},
            {id:'2', name:'审核中'},
            {id:'3', name:'审核驳回'}
        ],//审核状态列表
        fundingItems: [],//项目列表
        reviewStatusItems: [],//待审核审核状态过滤后的列表
        pagination: {
            currentPageItems: [],//当前页数据列表
            numPerPage: 10,
            maxSize: 5,
            bigTotalItems: 0,
            bigCurrentPage: 1
        },//分页
        sDialog: {
            submitTimeF: 0,//项目按提交时间排序，0:默认，1：由近到远，2：由远到近
            reviewStatusList: [
                {id:'0', name:'全部'},
                {id:'1', name:'待审核'},
                {id:'2', name:'审核中'},
                {id:'3', name:'审核驳回'},
                {id:'4', name:'待发布'},
                {id:'5', name:'众筹中'},
                {id:'6', name:'回报中'},
                {id:'-1', name:'已否决'},
                {id:'-4', name:'已下架'}
            ],//审核状态列表
            fundingItems: [],//搜索弹框内的众筹项目列表
            reviewStatusItems: [],//项目状态过滤后的列表
            loading: false,//搜索框离的loading状态
            pagination:{
                currentPageItems: [],//当前页数据列表
                numPerPage: 10,
                maxSize: 5,
                bigTotalItems: 0,
                bigCurrentPage: 1
            }//搜索框里面的分页
        }//搜索弹框
    };

    /*分页*/
    //设置当前页码
    $scope.of.pagination.setPage = function (pageNo) {
        $scope.of.pagination.bigCurrentPage = pageNo;
    };
    //改变当前页码事件处理
    $scope.of.pagination.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.of.pagination.bigCurrentPage);
        var numPerPage = $scope.of.pagination.numPerPage,
            start = ($scope.of.pagination.bigCurrentPage-1)*numPerPage;//分页起始位置

        if($scope.of.reviewStatus && $scope.of.reviewStatus.id != '0'){
            $scope.of.pagination.currentPageItems = $scope.of.reviewStatusItems.slice(start,start+numPerPage);
        }else{
            $scope.of.pagination.currentPageItems = $scope.of.fundingItems.slice(start,start+numPerPage);
        }
    };

    //审核状态过滤事件处理
    $scope.of.reviewStatusClick = function(){
        $scope.of.pagination.setPage(1);
        if($scope.of.reviewStatus && $scope.of.reviewStatus.id != '0'){
            $scope.of.reviewStatusItems = $filter('filter')($scope.of.fundingItems,{status:$scope.of.reviewStatus.id},true);
            $scope.of.pagination.bigTotalItems = $scope.of.reviewStatusItems.length;
            $scope.of.pagination.currentPageItems = $scope.of.reviewStatusItems.slice(0,$scope.of.pagination.numPerPage);
        }else{
            $scope.of.pagination.bigTotalItems = $scope.of.fundingItems.length;
            $scope.of.pagination.currentPageItems = $scope.of.fundingItems.slice(0,$scope.of.pagination.numPerPage);
        }
    };

    //获取项目列表
    $scope.of.getFundingList = function(groupId){
        $scope.of.pagination.setPage(1);
        $scope.of.reviewStatus = null;
        $scope.of.submitTimeF=0;
        $scope.of.passedTimeF=0;
        $scope.of.publishTimeF=0;
        $scope.of.auditTimeF=0;
        operation.listOperation({group_id:groupId||1}).then(function(response){
            response = response.data;
            if (response && response.status == 0 && response.data){
                if(response.data.list && response.data.list.length>0){
                    $scope.of.fundingItems = response.data.list;
                    $scope.of.pagination.bigTotalItems = $scope.of.fundingItems.length;
                    $scope.of.pagination.currentPageItems = $scope.of.fundingItems.slice(0,$scope.of.pagination.numPerPage);
                }
                $scope.of.tabList[0].num = response.data.count_group_a;//待审核
                $scope.of.tabList[1].num = response.data.count_group_b;//待发布
                $scope.of.tabList[2].num = response.data.count_group_c;//已发布
                $scope.of.tabList[3].num = response.data.count_group_d;//已否决
                $scope.of.tabList[4].num = response.data.count_group_e;//已下架
            }
        });
    };

    //按提交时间排序事件处理
    $scope.of.submitTimeClick = function(){
        $scope.of.passedTimeF=0;
        $scope.of.publishTimeF=0;
        $scope.of.auditTimeF=0;
        if($scope.of.submitTimeF==1){
            $scope.of.submitTimeF = 2;
        }else if($scope.of.submitTimeF==2){
            $scope.of.submitTimeF=1;
        }else{
            $scope.of.submitTimeF=1;
        }
        var numPerPage = $scope.of.pagination.numPerPage,
            start = ($scope.of.pagination.bigCurrentPage-1)*numPerPage;//分页起始位置
        if($scope.of.reviewStatus && $scope.of.reviewStatus.id != '0'){
            $scope.of.reviewStatusItems = $filter('orderBy')($scope.of.reviewStatusItems,'published',$scope.of.submitTimeF==1);
            $scope.of.pagination.bigTotalItems = $scope.of.reviewStatusItems.length;
            $scope.of.pagination.currentPageItems = $scope.of.reviewStatusItems.slice(start,start+numPerPage);
        }else{
            $scope.of.fundingItems = $filter('orderBy')($scope.of.fundingItems,'published',$scope.of.submitTimeF==1);
            $scope.of.pagination.bigTotalItems = $scope.of.fundingItems.length;
            $scope.of.pagination.currentPageItems = $scope.of.fundingItems.slice(start,start+numPerPage);
        }
    };

    var timeClickHandler = function(timeFlagName, orderByName){
        $scope.of.submitTimeF=0;
        if($scope.of[timeFlagName] == 1){
            $scope.of[timeFlagName] = 2;
        }else if($scope.of[timeFlagName] == 2){
            $scope.of[timeFlagName] = 1;
        }else{
            $scope.of[timeFlagName] = 1;
        }
        var numPerPage = $scope.of.pagination.numPerPage,
            start = ($scope.of.pagination.bigCurrentPage-1)*numPerPage;//分页起始位置

        $scope.of.fundingItems = $filter('orderBy')($scope.of.fundingItems,orderByName,$scope.of[timeFlagName]==1);
        $scope.of.pagination.bigTotalItems = $scope.of.fundingItems.length;
        $scope.of.pagination.currentPageItems = $scope.of.fundingItems.slice(start,start+numPerPage);
    };

    //按通过时间排序事件处理
    $scope.of.passedTimeClick = function(){
        timeClickHandler('passedTimeF', 'passed_time');
    };

    //按发布时间排序事件处理
    $scope.of.publishTimeClick = function(){
        timeClickHandler('publishTimeF', 'started');
    };

    //按发布时间排序事件处理
    $scope.of.auditTimeClick = function(){
        timeClickHandler('auditTimeF', 'audit_time');
    };

    //审核
    $scope.of.goToDetail = function(pid, status){
        if(status == '1'){
            operation.updateStatus({
                pid: pid,
                status: '2'
            }).then(function(response){
                response = response.data;
                if (response && response.status == 0){
                    //$state.go('operation.funding_view', {id: pid});
                }
            });
        }else{
            //$state.go('operation.funding_view', {id: pid});
        }
    };

    //显示预约发布弹框
    var showReleaseDialog= function(pid, started, name, mobile){
    };

    //预约发布
    $scope.of.releaseTimeClick = function(pid, started){
        operation.readSponsor({
            pid: pid
        }).then(function(sponsorRes){
            sponsorRes = sponsorRes.data;
            if(sponsorRes && sponsorRes.status == 0){
                if(sponsorRes.data.type == 1){
                    showReleaseDialog(pid, started, sponsorRes.data.name, sponsorRes.data.mobile);
                }else{
                    showReleaseDialog(pid, started, sponsorRes.data.et_contact_name, sponsorRes.data.et_contact_mobile);
                }
            }
        });
    };

    //显示搜索弹框
    $scope.of.showSearchDialog = function() {
        if(!$scope.of.searchInp) return;
    };
}]);