app.service('common', ['CONFIG', '$http', '$log', '$q', '$httpParamSerializerJQLike',
    function(CONFIG, $http, $log, $q, $httpParamSerializerJQLike) {
        var self = this;

        this.setCookie = function(objName, objValue, objMinute) {
            if (objName && objValue) {
                var str = objName + "=" + escape(objValue);
                if (!objMinute) {
                    objMinute = 60;
                }
                var date = new Date();
                var ms = objMinute * 60 * 1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString();
                str += ";path=/";
                str += (";domain=" + document.domain);
                str += "; secure";
                document.cookie = str;
            }
        };

        this.getCookie = function(objName) {
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp && temp.length > 0 && temp[0] === objName) {
                    return unescape(temp[1]);
                }
            }
            return "";
        };

        this.delCookie = function(name) {
            self.setCookie(name,'a',-10);
        };

        this.post = function(obj) {
            return $http({
                method: 'post',
                url: CONFIG.host + obj.url,
                data: $httpParamSerializerJQLike(obj.data),
                headers: {
                    'authtoken': self.getCookie('authtoken'),
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
                    'authtoken': self.getCookie('authtoken')
                },
                responseType: 'json'
            });
        };
    }]);