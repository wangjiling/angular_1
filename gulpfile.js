// 载入外挂
var gulp = require('gulp'),
    less = require('gulp-less'),//转换less用的
    svgSprite = require('gulp-svg-sprite'),//图片合并
    clean = require('gulp-clean'),//清除文件
    htmlmin = require('gulp-htmlmin'), //html压缩
    minifycss = require('gulp-minify-css'),//css压缩
    usemin = require('gulp-usemin'), //html优化替换
    uglify = require('gulp-uglify'),//js压缩
    copy = require('gulp-copy'),//copy
    replace = require('gulp-replace'),//替换
    path = require('path'),//path
    crypto = require('crypto');

var buildConfig = require('./gulp.config.js');
var version = crypto.createHash('md5').update(new Date().getTime().toString()).digest('hex').slice(0, 16);

/*清空打包目录*/
gulp.task('clean', function(){
    return gulp.src(buildConfig.build.rootPath, {read:false})
        .pipe(clean());
});
/*清空css目录*/
gulp.task('clean_css', function(){
    return gulp.src(buildConfig.src.css, {read:false})
        .pipe(clean());
});
/* html打包 */
gulp.task('htmlmin', ['clean'], function () {
    return gulp.src(buildConfig.src.view+'**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(buildConfig.build.view))
});

/*优化替换*/
gulp.task('usemin', ['less2css', 'sprite', 'clean'], function() {
    return gulp.src(buildConfig.src.rootPath+'index.html')
        .pipe(usemin({
            libjs: [uglify({mangle:false})],
            mainjs: [uglify({mangle:false})],
            css: [minifycss()]
        }))
        .pipe(gulp.dest(buildConfig.build.rootPath));
});

/*less转为css*/
gulp.task('less2css', ['clean_css'], function() {
    return gulp.src(buildConfig.src.less+'main.less')
        .pipe(less())
        .pipe(gulp.dest(buildConfig.src.css));
});

/*sprite合并svg*/
gulp.task('sprite', ['clean_css'], function() {
    return gulp.src(buildConfig.src.img+'**/*.svg')
        .pipe(svgSprite({
            shape: {
                id:{
                    generator: function(name){
                        return path.basename(name, '.svg');
                    }
                }
            },
            dest: buildConfig.src.css,
            mode: {
                css :{
                    dest:buildConfig.src.css,
                    render:{
                        css:true
                    },
                    prefix: ".svg-",
                    sprite: "svg/sprite.svg"
                },
                example: false
            }
        }))
        .pipe(gulp.dest('.'));
});

/*copy文件*/
gulp.task('copy', ['sprite', 'clean'], function(){
    return gulp.src([
        buildConfig.src.rootPath+'img/**/*.png',
        buildConfig.src.rootPath+'img/**/*.gif',
        buildConfig.src.rootPath+'css/svg/*.svg',
        buildConfig.src.rootPath+'favicon.ico'])
        .pipe(copy(buildConfig.build.rootPath, {prefix:1}));
});

/*copy bootstrap文件*/
gulp.task('copy_bootstrap', ['clean'], function(){
    return gulp.src('node_modules/bootstrap/dist/fonts/*', {base: 'node_modules/bootstrap/dist'})
        .pipe(gulp.dest(buildConfig.build.rootPath));
});

/*添加版本号，避免缓存*/
gulp.task('replace', ['htmlmin', 'less2css', 'sprite', 'usemin', 'copy', 'copy_bootstrap'], function(){
    gulp.src([buildConfig.build.rootPath+'/**/*.html', buildConfig.build.rootPath+'/**/*.css'])
        .pipe(replace(/\.css/g, ".css?v=" + version))
        .pipe(replace(/\.js/g, ".js?v=" + version))
        .pipe(replace(/\.png/g, ".png?v=" + version))
        .pipe(replace(/\.jpg/g, ".jpg?v=" + version))
        .pipe(replace(/\.gif/g, ".gif?v=" + version))
        .pipe(gulp.dest(buildConfig.build.rootPath));
});

/*开发环境*/
gulp.task('default', ['less2css', 'sprite'], function(){
    /*监视文件*/
    gulp.watch(['less/**/*.less', 'img/**/*.svg'], ['less2css', 'sprite'], function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

/*生产环境*/
gulp.task('build', ['replace']);