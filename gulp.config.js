"use strict";

/*build config*/
var FileConfig  = {
    /*bower directory*/
    bowerDir: 'app/bower_components/',

    /*源文件位置*/
    src : {
        rootPath: 'app/',
        view: 'app/views/',
        less: 'app/less/',
        css: 'app/css/',
        js: 'app/js/',
        img: 'app/img/'
    },

    /* 打包输出位置 */
    build : {
        rootPath: 'build/',
        view: 'build/views/',
        css: 'build/css/',
        js: 'build/js/',
        img: 'build/img/'
    }
};

module.exports = FileConfig;
