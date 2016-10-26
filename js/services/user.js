app.factory('user', ['$http', '$log', 'CONFIG', 'common', 'utility', function($http, $log, CONFIG, common, utility) {
    return {
        readUser: function(){
            return common.post({
                url: '/api/user/getuser',
                data:{authtoken: utility.getCookie('authtoken')||''}
            });
        },

        logoutUser: function(){
            return common.get({
                url: '/api/user/logout',
                data:{authtoken: utility.getCookie('authtoken')||''}
            });
        }
    }
}]);