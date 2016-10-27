app.factory('clearing', ['$http', '$log', 'CONFIG', 'common', function($http, $log, CONFIG, common) {
    return {
        /*理财清算接口start------>*/

        //产品列表
        auditList: function(data){
            return common.post({
                url: '/api/financing/audit_list',
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
        }

        /*体验标理财清算接口<------end*/
    }
}]);