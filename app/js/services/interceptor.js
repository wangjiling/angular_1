app.factory('AuHttpInterceptor', ['$q', '$window', function ($q, $window) {
    return {
        response: function (response) {
            if (response && response.data && response.data.status === -1001){
                //vincent-todo
                //统一处理请求错误
                $window.location.href = '#/login';
            }
            return response;
        },
        responseError: function (response) {
            // do something on error
            return $q.reject(response);
        }
    };
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuHttpInterceptor');
});