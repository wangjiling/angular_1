app.factory('operation', ['$http', '$log', 'CONFIG', 'common', function($http, $log, CONFIG, common) {
    return {
        listOperation: function (data) {
            return common.get({
                url: '/api/admin/project_audit_list',
                data: data
            });
        },
        newsList: function (data) {
            return common.get({
                url: '/api/admin/news/list',
                data: data
            });
        }
    }
}]);