app.factory('user', ['$http', '$log', 'CONFIG', 'common', function($http, $log, CONFIG, common) {
    return {
        readUser: function(){
            return common.post({
                url: '/api/user/getuser',
                data:{authtoken: common.getCookie('authtoken')||''}
            });
        },

        logoutUser: function(){
            return common.get({
                url: '/api/user/logout',
                data:{authtoken: common.getCookie('authtoken')||''}
            });
        }
    }
}]);