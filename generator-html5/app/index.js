/****************************************
  *
  * Created By Luke on 30th July, 2015 
  *
  ***************************************/  
'use strict';
var generators = require('yeoman-generator');
var chalk      = require('chalk');
var mkdirp     = require('mkdirp');

// 问题的回答
var _answers = {};
// 白底黑字的标题
var tPanel = chalk.bgWhite.black;
// 格式化年月日变量
var fileSrc;

/*
 * 生成年月日字符串函数,如20150806
 */
function createDate() {
  var date = new Date().toISOString();
  date = date.split('T', 1)[0].split('-').join('');
  return date;
}

module.exports = generators.Base.extend({
  constructor: function () {
  	generators.Base.apply(this, arguments);
  },

  prompting: function () {
    this.log(tPanel('\n' +
      '  ********* 即将创建一个新项目 *********\n'+
      '  输入项目信息'));
    var _this = this;
    var done = this.async();
    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : '项目文件夹名',
      default : 'newproj'
    },{
      type    : 'input',
      name    : 'author',
      message : '项目作者',
      default : 'author'
    }];
    this.prompt(prompts, function (answers) {
      _answers = answers;
      this.appname = answers.name;
      var dateString = createDate();

      // 重新定义fileSrc
      fileSrc  = this.appname + '_' + dateString;
      // 重新定义项目路径
      this.destinationRoot(this.destinationPath('projects/' + fileSrc));

      done();

    }.bind(this));
  },
  writing: {
    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {author: _answers.author}
      );
    },
    templates: function () {
      this.fs.copyTpl(
        this.templatePath('tmp'),
        this.destinationPath('tmp/')
      );
      this.fs.copyTpl(
        this.templatePath('src'),
        this.destinationPath('src/')
      );
      this.fs.copyTpl(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },
    installPackage: function () {
      this.log(tPanel('  ********* 开始安装npm包 *********\n' +
        '  如果安装失败请自行在项目目录运行npm install'));
      // this.npmInstall('package.json', function () {
      //   console.log(tPanel('  ********* 安装npm包安装完成 *********\n'));
      // });
      this.installDependencies({
        bower: false,
        npm: true,
        callback: function () {
          console.log(tPanel('Everything is ready!'));
        }
      });
    }
  }
});