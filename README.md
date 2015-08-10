# HTML5 Pages Workflow
H5workflow for our projects.
An html5 pages workflow. :)
Generatored by Yeoman and Gulp.

# 使用说明 - 生成新项目
1. 首先将项目clone到本地
2. 命令行进入generator-html5目录link npm模块 `$ cd h5workflow/generator-html5`
3. 命令行复制模块快捷方式到全局 `$ npm link`
4. 回到项目根目录 `$ cd ..`
5. 运行 `$ yo html5` 创建新项目

创建的新项目将被保存到projects文件夹下，项目名称为 输入的名字_日期

# 接下来就可以实现自动化工作了！
> 可以使用Jade, Sass, 图片将自动压缩， js文件将压缩并且合并


* 项目第一次建立首先生成打包后目录dist/

    通过 `$ gulp`命令
    
* 开启服务器实时预览

    通过 `$ gulp server`命令
    
* 文件配置（位于gulpfile.js文件中）

* 生成的目录 
<pre>
-- src
  | -- images
  | -- stylesheets
       ｜style.scss   //主要css写在这里，如需新建其他css文件请在此文件中通过@import引入
  | -- javascripts  //需要用到的js文件都复制到该目录下
       | main.js      //主要js文件写在这里
  | index.jade      //html主文件
-- tmp
  | -- images       //公用图片
  | -- jade         //公用模板
  | -- stylesheets  //公用样式
  | -- javascripts  //一些预置的js文件，如需使用请复制到src/javascripts目录下
</pre>

需要使用的js文件请在gulpfile.js中设置（注意引入先后顺序）

:)