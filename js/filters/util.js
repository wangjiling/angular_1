/*系统工具类方法*/
app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]).filter('to_trusted_url', ['$sce', function($sce){
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}])
//电话号码设置成123****1234
.filter('phone_number',[function(){
    return function(number){
        number = number || '';
        return number.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }   
}]).filter('crop_image',[function(){    //获取指定宽高比例的图片
    return function(image,height,width){
        var cropImg = image||'';
        if(!cropImg) return '';

        if(height && width){
            cropImg = cropImg +  '@'+height+'h_'+width+'w_1e_1c';
        }else if(height && !width){
            cropImg = cropImg +  '@'+height+'h';
        }else if(!height && width){
            cropImg = cropImg +  '@'+width+'w';
        }
        return cropImg;
    }
}]);