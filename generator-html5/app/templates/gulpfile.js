/****************************************
  *
  * Created By Luke on 6th August, 2015 
  *
  ***************************************/

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

/****************************************
  *
  * 配置文件
  *
  ***************************************/

 // 开发环境目录
 var SRC  = '/src/';
 // 上线环境目录
 var DIST = '/dist/';

function config(path) {
 var config = {
 	path:    path,

 	// SASS文件目录
 	css:     path + 'css/',
 	// 主要SASS文件名（仅编译主文件，其他请通过@import引入）
 	cssName: 'style.scss',
 	// 图片目录
 	img:     path + 'images/',
 	// JavaScript文件目录
 	js:      path + 'javascripts/',
 	// 待处理的JavaScript文件（请按文件引入顺序存放）
 	jsFile:  ['zepto.min.js',
			  'wx.js',
			  'wxbridge.js',
			  'main.js']
 };
 return config;
};

 //开发环境对象
 var configSrc  = config(SRC);
 //上线环境对象
 var configDist = config(DIST);

/****************************************
  *
  * 全局任务
  *
  ***************************************/
gulp.task('default', ['sass', 'uglifyjs', 'imagemin', 'jade'], 
	function () {

});

/****************************************
  *
  * 处理Sass任务
  *
  ***************************************/
gulp.task('sass', function() {
	var sass         = require('gulp-ruby-sass');
	var autoprefixer = require('gulp-autoprefixer');
	return sass(configSrc.css + configSrc.cssName, {sourcemap: true})
	  .on('error', function(err) { //当错误时抛出错误信息
	  	console.error('error', err.message);
	  })
	  .pipe(autoprefixer())
	  .pipe(sourcemaps.write())
	  .pipe(gulp.dest(configDist.css));
});

/****************************************
  *
  * 压缩与合并js
  *
  ***************************************/
gulp.task('uglifyjs', function(){
	var uglify = require('gulp-uglify');
	var src    = configSrc.js;
	var jsArr  = configSrc.jsFile;
	var concat = require('gulp-concat');

	for (var i=0, len = jsArr.length; i<len; i++) {
		jsArr[i] = src + jsArr[i];
	}
	console.log(jsArr);

	return gulp.src(jsArr)
      .pipe(uglify())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(configDist.js));
});

/****************************************
  *
  * 压缩图片
  *
  ***************************************/
gulp.task('imagemin', function() {
	var imagemin = require('gulp-imagemin');
	var pngquant = require('imagemin-pngquant');
	return gulp.src(configSrc.img + '*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(configDist.img));
});

/****************************************
  *
  * 编译Jade模板
  *
  ***************************************/
gulp.task('jade', function() {
  var jade   = require('gulp-jade');
  var YOUR_LOCALS = {};

  gulp.src(configSrc.path + 'base.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest(configDist.path))
});