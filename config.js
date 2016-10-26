"use strict";

/*build config*/
var FileConfig  = {
    /* 打包输出位置 */
    build : {
        rootPath: 'build',
        view: 'build/views/',
        css: 'build/css/',
        js: 'build/js/',
        img: 'build/img/'
    },

    /* src路径 */
    src : {
        view: 'views/**/*.html',
        img: 'img/**/*'
    }
};

module.exports = FileConfig;
