app.service('utility', ['CONFIG', '$http', '$log', '$q'
    ,function(CONFIG, $http, $log, $q) {

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
            //str += "; secure";
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
}]);