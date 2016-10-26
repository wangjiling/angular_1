app.factory('clearing', ['$http', '$log', 'CONFIG', 'common', 'utility', function($http, $log, CONFIG, common, utility) {
    return {
        /*理财清算接口start------>*/
        //产品列表
        auditList: function(data){
            return common.post({
                url: '/api/financing/audit_list',
                data: data
            });
        },
        //统计金额
        statisticsAmount: function(data){
            return common.post({
                url: '/api/financing/statistics_amount',
                data: data
            });
        },
        //优惠券充值
        payCoupons: function(data){
            return common.post({
                url: '/api/financing/pay_coupons',
                data: data
            });
        },
        //查看清算指令
        showProgressInstruct: function(data){
            return common.post({
                url: '/api/financing/show_progress_instruct',
                data: data
            });
        },
        //确认募集状态
        confirmRaise: function(data){
            return common.post({
                url: '/api/financing/confirm_raise',
                data: data
            });
        },
        //申请放款
        applyLoan: function(data){
            return common.post({
                url: '/api/financing/apply_loan',
                data: data
            });
        },
        //放款审核
        approveLoan: function(data){
            return common.post({
                url: '/api/financing/approve_loan',
                data: data
            });
        },
        //下载出款明细
        downloadOutDetail: function(data){
            return common.get({
                url: '/api/financing/download_outmoneydetail',
                data: data
            });
        },
        //获取用户角色
        getRole: function(data){
            return common.get({
                url: '/api/financing/role',
                data: data
            });
        },
        //重发指令
        resendInstruct: function(data){
            return common.post({
                url: '/api/financing/resend_instruct',
                data: data
            });
        },
        //申请回款
        applyRecycle: function(data){
            return common.post({
                url: '/api/financing/apply_recycle',
                data: data
            });
        },
        //回款审核
        approveReturnMoney: function(data){
            return common.post({
                url: '/api/financing/approve_returnMoney',
                data: data
            });
        },
        //申请退款
        applyRefund: function(data){
            return common.post({
                url: '/api/financing/apply_refund',
                data: data
            });
        },
        //批量充值优惠券
        batchPayCoupons: function(data){
            return common.post({
                url: '/api/financing/batch_pay_coupons',
                data: data
            });
        },
        //批量申请放款
        batchApplyLoan: function(data){
            return common.post({
                url: '/api/financing/batch_apply_loan',
                data: data
            });
        },
        //放款时获取收款银行帐户信息
        receiptBankAccount: function(data){
            return common.post({
                url: '/api/financing/receipt_bank_account',
                data: data
            });
        },

        /*理财清算接口<------end*/

        /*体验标理财清算接口start------>*/

        //体验标清结算进展列表展示
        experienceAuditList: function(data){
            return common.post({
                url: '/api/financing/experience/audit_list',
                data: data
            });
        },

        //批量回款
        batchReturnMoney: function(data){
            return common.post({
                url: '/api/financing/experience/batch_returnMoney',
                data: data
            });
        },

        //全部回款
        allReturnMoney: function(data){
            return common.post({
                url: '/api/financing/experience/all_returnMoney',
                data: data
            });
        }
        /*体验标理财清算接口<------end*/
    }
}]);