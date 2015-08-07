/** Created By Luke on 30th July, 2015 **/
var gulp   = require('gulp');
var prompt = require('prompt');
var mkdirp = require('mkdirp');

gulp.task('new', ['filename'], function(){

});

gulp.task('filename', function(){
	/******************
	  *
	  * 生成新的项目目录
	  *
	 ******************/
	function createFolder(){
	  console.log('*********输入项目信息*********');
	  var prompt = require('prompt');
	  prompt.start();
	  prompt.get(['filename', 'author'], function (err, result) {
	  	var filename = result.filename,
	  		author   = result.author,
	  		day      = (new Date().getDate() < 10) ? ('0' + new Date().getDate()) : (new Date().getDate()) ,
	  		month    = (new Date().getMonth() < 9)? ('0' + (new Date().getMonth() +1)): (new Date().getMonth() +1),
	  		year     = new Date().getFullYear();
	  	if ( !(filename && author) ) {
	  		console.log('信息不完整，请重新输入命令');
	  		return false;
	  	}
	    console.log('*********项目信息如下*********');
	    console.log('  项目名称: ' + filename);
	    console.log('  项目作者: ' + author);
	    console.log('  创建时间: ' + year + month + day);

	    var filePath = './projects/' + filename + '_' + year + month + day;
	    mkdirp(filePath, function (err) {
	      if (err) console.error(err);
		});
	  });
	}
    setTimeout(createFolder, 100);
});

/******************
  *
  * 渲染模板
  *
 ******************/
 gulp.task('render', function(){
  var jade        = require('gulp-jade');
  var YOUR_LOCALS = {};

  gulp.src('./lib/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'));
 });



