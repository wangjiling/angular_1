app.service('common', ['CONFIG', '$http', '$log', '$q', '$httpParamSerializerJQLike', 'utility','$window',
    function(CONFIG, $http, $log, $q, $httpParamSerializerJQLike, utility, $window) {
        var self = this;

        self.authtokenGetter = function(){
            return utility.getCookie('authtoken');
        };

        this.post = function(obj) {
            return $http({
                method: 'post',
                url: CONFIG.host + obj.url,
                data: $httpParamSerializerJQLike(obj.data),
                headers: {
                    'authtoken': self.authtokenGetter(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json'
            });
        };

        this.get = function(obj) {
            return $http({
                method: 'get',
                url: CONFIG.host + obj.url,
                params: obj.data,
                headers: {
                    'authtoken': self.authtokenGetter()
                },
                responseType: 'json'
            });
        };
    }]);