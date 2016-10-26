app.factory('operation', ['$http', '$log', 'CONFIG', 'common', 'utility', function($http, $log, CONFIG, common, utility) {
    return {
        listOperation: function(data){
            return common.get({
                url: '/api/admin/project_audit_list',
                data: data
            });
        },
        listAuditHistory: function(data){
            return common.get({
                url: '/api/admin/audit_history_list',
                data: data
            });
        },
        readProjectDetail: function(data){
            return common.get({
                url: '/api/project/detail',
                data: data
            });
        },
        saveReward: function(data){
            return common.post({
                url: '/api/project/save_reward',
                data: data
            });
        },
        listReward: function(data){
            return common.post({
                url: '/api/project/reward_list_detail',
                data: data
            });
        },        
        readSponsor: function(data){
            return common.get({
                url: '/api/project/sponsor_detail',
                data: data
            });
        },
        readAccount: function(data){
            return common.get({
                url: '/api/project/account_detail',
                data: data
            });
        },
        saveSuggestion: function(data){
            return common.post({
                url: '/api/admin/save_suggestion',
                data: data
            });
        },
        updateStatus: function(data){
            return common.post({
                url: '/api/admin/update_status',
                data: data
            });
        },
        readNews: function(data){
            return common.post({
                url: '/api/admin/news/get',
                data: data
            });
        },
        createNews: function(data){
            return common.post({
                url: '/api/admin/news/create',
                data: data
            });
        },
        updateNews: function(data){
            return common.post({
                url: '/api/admin/news/update',
                data: data
            });
        },
        topNews: function(data){
            return common.post({
                url: '/api/admin/news/top',
                data: data
            });
        },
        offTopNews: function(data){
            return common.post({
                url: '/api/admin/news/offTop',
                data: data
            });
        },
        newsList: function(data){
            return common.get({
                url: '/api/admin/news/list',
                data: data
            });
        },
        delNews: function(data){
            return common.post({
                url: '/api/admin/news/delete',
                data: data
            });
        },
        delBatchNews: function(data){
            return common.post({
                url: '/api/admin/news/batchDelete',
                data: data
            });
        },
        createResource: function(data){
            return common.post({
                url: '/api/admin/save_project_resource',
                data: data
            });
        },
        deleteResource: function(data){
            return common.post({
                url: '/api/admin/delete_project_resource',
                data: data
            });
        },
        updateResource: function(data){
            return common.post({
                url: '/api/admin/update_project_resource',
                data: data
            });
        },
        listResource: function(data){
            return common.get({
                url: '/api/admin/get_resource_list',
                data: data
            });
        },
        searchProjects: function(data){
            return common.get({
                url: '/api/admin/search_projects',
                data: data
            });
        },
        //优惠券详情
        couponDetails: function(data){
            return common.post({
                url: '/api/admin/coupon/coupondetails',
                data: data
            });
        },
        getCouponCode:function(){
            return common.get({
                url: '/api/admin/coupon/getCouponCode'
            });
        },
        getCouponEdit:function(data){
            return common.get({
                url: '/api/admin/coupon/getCouponInfo4edit',
                data: data
            });
        },
        setCouponNew:function(data){
            return common.post({
                url: '/api/admin/coupon/saveOrSubmitCoupon',
                data: data
            });
        },
        getKindList:function(data){
            return common.get({
                url:'/api/admin/coupon/getKindList',
                data:data
            });
        },
        getSeriesList:function(data){
            return common.get({
                url:'/api/admin/coupon/getSeriesList',
                data:data
            });
        },
        getProjectList:function(data){
            return common.get({
                url:'/api/admin/coupon/getProjectList',
                data:data
            });
        },
        getProductList:function(data){
            return common.get({
                url:'/api/admin/coupon/getProductList',
                data:data
            });  
        },
        //删除优惠券
        deleteCoupon: function(data){
            return common.post({
                url:'/api/admin/coupon/delCoupon',
                data:data
            });
        },
        //发放优惠券
        deliverCoupon: function(data){
            return common.post({
                url:'/api/admin/coupon/giveOutCoupon',
                data:data
            });
        },
        //停用优惠券
        stopCoupon: function(data){
            return common.post({
                url:'/api/admin/coupon/stopCoupon',
                data:data
            });
        },
        //审核优惠券
        auditCoupon: function(data){
            return common.get({
                url:'/api/admin/coupon/saveApproveRet',
                data:data
            });
        },
        //审核优惠券列表
        auditCouponList: function(data){
            return common.get({
                url:'/api/admin/coupon/queryCouponApproveList',
                data:data
            });
        },
        //优惠券列表
        couponList:function (data) {
            return common.get({
                url:'/api/admin/coupon/queryCouponList',
                data:data
            })
        },
        //提交优惠券（详情页）
        submitCoupon: function(data){
            return common.post({
                url:'/api/admin/coupon/submitCoupon',
                data:data
            });
        }
    }
}]);