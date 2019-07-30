<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

  - [参考手册](#%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C)
  - [node自启动插件](#node%E8%87%AA%E5%90%AF%E5%8A%A8%E6%8F%92%E4%BB%B6)
  - [~~基本概念~~](#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)
  - [NPM的使用](#npm%E7%9A%84%E4%BD%BF%E7%94%A8)
  - [~~交互式解释器~~](#%E4%BA%A4%E4%BA%92%E5%BC%8F%E8%A7%A3%E9%87%8A%E5%99%A8)
  - [~~事件循环~~](#%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF)
  - [模块与包](#%E6%A8%A1%E5%9D%97%E4%B8%8E%E5%8C%85)
  - [全局变量](#%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F)
  - [fs模块](#fs%E6%A8%A1%E5%9D%97)
  - [http模块](#http%E6%A8%A1%E5%9D%97)
  - [url模块](#url%E6%A8%A1%E5%9D%97)
  - [~~querystring模块~~](#querystring%E6%A8%A1%E5%9D%97)
  - [get与post数据](#get%E4%B8%8Epost%E6%95%B0%E6%8D%AE)
  - [~~formidable模块~~](#formidable%E6%A8%A1%E5%9D%97)
  - [ejs模块](#ejs%E6%A8%A1%E5%9D%97)
  - [art-template模块](#art-template%E6%A8%A1%E5%9D%97)
  - [express中使用art-template](#express%E4%B8%AD%E4%BD%BF%E7%94%A8art-template)
  - [ajax-javascript](#ajax-javascript)
  - [ajax-jQuery](#ajax-jquery)
  - [mime查询表](#mime%E6%9F%A5%E8%AF%A2%E8%A1%A8)
- [mongoDB](#mongodb)
  - [node代码如何连接数据库](#node%E4%BB%A3%E7%A0%81%E5%A6%82%E4%BD%95%E8%BF%9E%E6%8E%A5%E6%95%B0%E6%8D%AE%E5%BA%93)
  - [基本案例](#%E5%9F%BA%E6%9C%AC%E6%A1%88%E4%BE%8B)
  - [增加数据](#%E5%A2%9E%E5%8A%A0%E6%95%B0%E6%8D%AE)
  - [查询数据](#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE)
  - [更新数据](#%E6%9B%B4%E6%96%B0%E6%95%B0%E6%8D%AE)
  - [删除数据](#%E5%88%A0%E9%99%A4%E6%95%B0%E6%8D%AE)
  - [补充：根据`_id`操作](#%E8%A1%A5%E5%85%85%E6%A0%B9%E6%8D%AE_id%E6%93%8D%E4%BD%9C)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 参考手册

http://nodejs.cn/api/

## node自启动插件

> 在没有使用sublim中启动服务器之前，我们都是用命令台`node index.js`启动服务，太麻烦。这里推荐一个自启动插件，一旦启动之后，代码每次更改保存服务都会自动重启。

```javascript
//全局安装插件 nodemon
npm i nodemon -g
//以后使用nodemon 代替 node 命令运行js文件
nodemon index.js
```

## ~~基本概念~~

- node.js是运行在服务器端的javascript
- node.js是基于v8引擎的平台
- 单线程、基于事件循环、异步I/O

## NPM的使用

> 在node中进行开发时，必不可少的需要下载和管理第三方包。NPM是随node一起安装的包管理工具，用于包的创建、下载、更新、删除等操作。

- 常用命令：

```
npm i express 当前目录安装
npm i express -g 全局安装
npm update expess 更新当前目录的包
npm uninstall express 卸载（删除）当前目录的包
npm list -g 查看全局安装包的目录
npm list grunt 查看grunt的版本号
npm ls 查看安装包的目录
npm serch express
npm init  初始化包（创建自定义包）
npm publish
```

- 使用淘宝镜像
  - 安装相关包 `npm i -g cnpm --registry=https://registry.npm.taobao.org`
  - 使用`cnpm`代替`npm`进行包管理

## ~~交互式解释器~~

> node自带的一个类似于window命令台的系统，可以实现：读取、执行、输出、循环

- 命令

```
tab 列出内置对象
.help 列出当前可用命令
.break 退出多行表达式
.clear 退出多行表达式
.save filename 保存代码到文件
.load filename 加载文件中的代码
```

## ~~事件循环~~

- node中几乎所有的API都是支持回调函数的，也就是基于事件监听。
- 自定义事件并触发（能力有限，没发现实际用处）

```javascript
var events = require("events");
var myEmitter = new events.EventEmitter();
//注册事件
myEmitter.on("myevent",function(){})
//触发事件
myEmitter.emit("myevent");
```

- `EventEmitter`属性:不用介绍，一眼识破

```javascript
addListener(event,listener)
on(event,listener)
once(event,listener)
removeListener(event,listener)
removeAllLiteners([event])
setMaxListeners(n)
listeners(event)
emit(event,arg1,arg2)
```



## 模块与包

> 使用exports+require实现js文件间的数据互通。

- 使用方式

```javascript
/*主程序：server.js
 		1、用来开启服务及加载各个模块代码
 		2、使用require()加载其他模块，会直接获取被加载模块的exports变量
 		3、模块化开发的最终目的，主程序只负责分配任务，具体的逻辑都是调用其他模块完成。
 */

 var demo = require("./demo.js") //此时demo 就等于 demo.js的exports
 /*
	demo = exports = {
		obj：{
			age:18,
			name:"sc"
		}
	}
 */
 console.log(demo.obj.age) //18
 console.log(demo.obj.name)//sc
```

```javascript
/*模块程序：demo.js
		用来实现具体业务
*/
// 声明任意数据
var obj = {
	age:18,
	name:"sc"
}
// 将数据存储或赋值给内置变量exports
exports.obj = obj;	// module.exports = obj;
```

其他内容：

```javascript
/*
	包（模块）的加载顺序：内置模块----第三方模块----自定义模块

	下载的第三方包全部会放在node_module文件夹中（会自动帮你创建）
	
	注意：引入内置模块和第三方模块时都可以直接写名称，自定义模块就必须写路径
*/
```



## 全局变量

```javascript
__dirname
__filename
global
```

## fs模块

```javascript
fs.
```

> api实在懒得写
>
> **注意事项：：：：：：：：**
>
> ​	1、 **fs的文件读取路径，被设计为相对于主程序。（命令台所在的目录）**
>
> ​		**也就是说就算是在其他模块中读取文件，如果路径写的是相对路径，相对的是主程序文件（命令台目录）。**
>
> ​	2、**开发中直接使用fs模块的概率很小**

## http模块

- 使用http模块创建一个基本的服务程序

```javascript
var http = require("http");//建立基本的http服务
var url = require("url");//解析url字符串为url对象
var querystring = require("querystring");//解析查询字符串为对象

var server = http.createServer(function(request,response){
    console.log(request.socket.remoteAddress)
	console.log(request.socket.remotePort)
    var userIP = request.connection.remoteAddress;//获取客户端ip
    var reqUrl = request.url;//获取请求的url
	var reqMethod = request.method;//获取请求的方式
    
    
	// 设置相应头
	response.writeHead(200, "ok", {
		"Content-Type":"text/plain;charset=utf8"
	})
	// 设置响应头

	/*response.statusCode = 200;
	response.setHeader("Content-Type", "text/plain;charset=utf8");*/
	
    //重定向:http 没有直接提供重定向的api
    res.writeHead(302,{
            'Location': 'http://127.0.0.1:8080/login'
    })
	// 响应信息
	response.write("访问服务器成功");
	response.end("success");
})

server.listen(8080,"127.0.0.1", function(args) {
	console.log("server is running")
})

```

## url模块

```
var http = require("http");//建立基本的http服务
var url = require("url");//解析url字符串为url对象
var querystring = require("querystring");//解析查询字符串为对象
---
var server = http.createServer(function(request,response){
	var reqUrl = request.url;//获取请求的url
	var reqMethod = request.method;//获取请求的方式
	// 使用url模块解析url字符串,有true参数时，会自动调用querystring模块功能将query字符串解析为对象
	reqUrl  = url.parse(reqUrl,true);
	var pathname = requrl.pathname;//字符串
	var query = reqUrl.query;//对象
	---
})


---

```



## ~~querystring模块~~

```
	---
	var reqUrl = request.url;//获取请求的url

	// 使用querystring模块解析查询字符串,没有设置true参数，只能得到query字符串，然后手动使用querystring模块解析query字符串为对象
	reqUrl  = url.parse(reqUrl);
	var pathname = reqUrl.pathname;//字符串
	var query = reqUrl.query;//字符串
	query = querystring.parse(query);//对象
```

## get与post数据

```
	// 获取get方式发送的数据-直接解析url获得查询数据query
	// 获得post方式发送的数据---基于事件原理---分段接收数据(data)---直到数据接收完毕(end)
	var postQuery = "";
	// 分段接收post数据
	request.on("data",function(chunk){
		postQuery = postQuery + chunk;
	})
	// 接收完毕
	request.on("end",function(){
		// 使用querystring模块将query字符串转换为对象
		postQuery = querystring.parse(postQuery);
		console.log(postQuery);
	})
```

## ~~formidable模块~~

- 作用为处理表单请求，获取表单提交的数据及文件。

文档地址：https://www.npmjs.com/search?q=form

- 基本结构

```javascript
var http = require("http");
var formidable = require('formidable');//第三方包，用于处理form提交的数据
var util = require("util");//格式化数据---显示方式
----
if(req.url == "/dopost" && req.method.toLowerCase() == "post"){
        //Creates a new incoming form.
        var form = new formidable.IncomingForm();
        //设置文件上传存放地址
        form.uploadDir = "./uploads";
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function(err, fields, files) {
            if(err){
                throw err;
            }
            console.log(fields);
            console.log(files);
            console.log(util.inspect({fields: fields, files: files}));
            //所有的文本域、单选框，都在fields存放---表单数据
            //所有的文件域，files---图片描述信息（不是文件数据）
            res.writeHead(200, {'content-type': 'text/plain'});

            res.end("成功");
        });
    }
```

- 文件改名
  - 注意：需要手动创建存储文件的文件夹
  - 所有req与res------request与response

```javascript
var http = require("http");
var formidable = require('formidable');//第三方包：用于处理表单提交的数据
var util = require("util");
var fs = require("fs");
var sd = require("silly-datetime"); //第三方包-用于生成格式化的日期时间
var path = require("path");//处理文件路径
---
    //如果你的访问地址是这个，并且请求类型是post
    if(req.url == "/dopost" && req.method.toLowerCase() == "post"){
        //Creates a new incoming form.
        var form = new formidable.IncomingForm();
        //设置文件上传存放地址
        form.uploadDir = "./uploads";
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function(err, fields, files) {
            //if(err){
            //    throw err;
            //}
            //console.log(util.inspect({fields: fields, files: files}));

            //时间，使用了第三方模块，silly-datetime
            var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
            var ran = parseInt(Math.random() * 89999 + 10000);
            var extname = path.extname(files.tupian.name);
            //执行改名
            var oldpath = __dirname + "/" + files.tupian.path;
            //新的路径由三个部分组成：时间戳、随机数、拓展名
            var newpath = __dirname + "/uploads/" + ttt + ran + extname;

            //改名
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    throw Error("改名失败");
                }
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end("成功");
            });
        });
```

## ejs模块

- 作用为使用模板数据

## art-template模块

[官方文档][https://aui.github.io/art-template/zh-cn/docs/index.html]

- 模板基础语法：具体的去查api，我就写几个常用的。

```
//文本输出
{{value}} //不会编译html
{{@ value}}//会编译html
 //条件语句
{{if value}} ... {{/if}}
{{if v1}} ... {{else if v2}} ... {{/if}}
 //循环语句
{{each target}}
    {{$index}} {{$value}}
{{/each}}                                 
```

```
//子模板
{{include("./header.html")}}
{{include("./header.html",data)}}

//{{@include ...}}
```

```
//继承   主模板 layout.html

<header>123</header>
		<!-- 挖个坑，让孩子去填。 -->
		{{block "count"}}
			默认内容
		{{/block}}

<footer>123</footer>


//继承	子模板  01.html

{{extend "./layout.html"}}
		
        <!-- 填坑 -->
        {{block "count"}}
        自己的内容
        {{/block}}

```



- 使用方式：具体查api。我也只写一种，前后台使用方式一样。

```javascript
var data = "<h1>{{value}}</h1>"
	data = template.render(data,{value:123})//"<h1>123</h1>"
```

## express中使用art-template

- 下载（这个会自动引入，不需要手动引入）

```javascript
npm install --save art-template
npm install --save express-art-template
```

- 配置：使用express-art-template作为中间件渲染art格式的文件

```javascript
app.engine('art', require('express-art-template'));
//参数配置，可以不做
//app.set('view options', {
//    debug: process.env.NODE_ENV !== 'production'
//});
//理解之后，就可以这么干
//app.engine('html', require('express-art-template'));
```

- 使用：配置之后就可以使用render函数

```javascript
res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
```

```javascript
注意：
	1、文件不写路径，默认渲染根目录下views文件下的文件，直接文件名即可
    2、网页文件的后缀要改为.art
```

- 更改默认渲染文件目录:除非太闲，不然不要改

```javascript
app.set("views","__dirname/public")
```



## ajax-javascript

```javasc
var request = XMLHttpRequest? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"); // 新建XMLHttpRequest对象

//异步函数处理响应
request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            console.log(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
           console.log("请求失败："+request.status);
        }
    } else {
        // HTTP请求还在继续...
        console.log("请求未完成...");
    }
}

// 发送请求:仿照表单发送数据的形式 手动拼出数据

//get 方式：将数据拼接在url后边
//post 方式：以字符串形式，将数据放在send()中；
request.open('GET', 'http://127.0.0.1:8080/?name=sun&age=18');
request.send();

//使用post发送数据要设置数据的编码方式（form也是），否则数据可能发送失败
//request.open('POST', 'http://127.0.0.1:8080')
//request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//request.send('name=sun&age=18');
```



## ajax-jQuery

- jQuery封装了多个方法，分别适合在不同的情况下使用ajax
- 参考地址：http://www.runoob.com/jquery/jquery-ref-ajax.html

| [$.ajax()](http://www.runoob.com/jquery/ajax-ajax.html)      | 执行异步 AJAX 请求                                      |
| ------------------------------------------------------------ | ------------------------------------------------------- |
| [$.get()](http://www.runoob.com/jquery/ajax-get.html)        | 使用 AJAX 的 HTTP GET 请求从服务器加载数据              |
| [$.post()](http://www.runoob.com/jquery/ajax-post.html)      | 使用 AJAX 的 HTTP POST 请求从服务器加载数据             |
| [$.getScript()](http://www.runoob.com/jquery/ajax-getscript.html) | 使用 AJAX 的 HTTP GET 请求从服务器加载并执行 JavaScript |
| [$.getJSON()](http://www.runoob.com/jquery/ajax-getjson.html) | 使用 HTTP GET 请求从服务器加载 JSON 编码的数据          |
| [$.getScript()](http://www.runoob.com/jquery/ajax-getscript.html) | 使用 AJAX 的 HTTP GET 请求从服务器加载并执行 JavaScript |
| [load()](http://www.runoob.com/jquery/ajax-load.html)        | 从服务器加载数据，并把返回的数据放置到指定的元素中      |

- $.ajax()

```javascript
$.ajax({
   type: "POST",//访问方式
   url: "some.php",//访问的url
   data: "name=John&location=Boston", //发送的数据
   dataType:"script",//获取的文档类型---未设置会自动判断
   async:true,//是否异步
   cache:true,//是否缓存
   timeout:2000,//超时时间，超过时间自动结束等待
   before:function(req){},//发送数据之前
   success: function(msg){ //请求成功的处理函数  msg是返回的结果
     alert( "Data Saved: " + msg );
   },
   error:function(err){}//请求失败之后
    
});
```

- data ：可以是拼接好的字符串  ,如果不是，jquery会自动将数据转化为查询字符串=所以可以是 string/ {}

## mime查询表

[参考地址][http://www.w3school.com.cn/media/media_mimeref.asp]

# mongoDB

## node代码如何连接数据库

- node中连接管理数据库需要借用`mongoose`包，这是一个第三方包，需要下载。
- npm i mongoose
- 连接方式

```javascript
var mongoose = require("mongoose");

// 定义变量存储 mongoDB软件的连接地址
// var DB_URL =  "mongodb://locahost:27017";
// mongoose.connect("DB_URL");
mongoose.connect("mongodb://127.0.0.1:27017");
// 也可以设置解析数据的方式，当然不设置也可以====如果包url不能解析错误就必须设置
// mongoose.connect("mongodb://127.0.0.1:2701",{ useNewUrlParser: true });

//根据连接状态，会触发不同的事件
mongoose.connection.on("connected",function(){
	console.log("成功");
})

mongoose.connection.on("error",function(){
	console.log("失败");
})

mongoose.connection.on("disconnected",function(){
	console.log("断开");
})
```

## 基本案例

- 连接成功以后，就能管理数据库了。
- 首先是在数据库中插入数据-----具体操作方法，与之前写的命令一致

```javascript
mongoose.connection.on("connected",function(){
		console.log("服务器连接成功");


	// 定义数据库的数据类型
	var Schema = mongoose.Schema;
	var UserSchema = new Schema({
		name:{type:String},
		age:{type:Number}
	})
    //使用定义的数据模型，定义数据模板
	var User = mongoose.model("User",UserSchema);
    //使用数据模板，创建数据
	var user1 = new User({
		name:"sun",
		age:18,
	})
    //数据调用save()方法，完成数据插入
	user1.save(function(err,res){
		if(err){
			console.log("插入数据失败")
		}else{
			console.log("插入数据成功")
		}
	})

})
```

- 可被支持的数据类型
  String	/	Number	/	Date	/	Buffer	/	Boolean	/	Array:   `type:Array`  `type:[Number]`
- 插入数据的操作时特殊的：
  - 使用model对象生成数据
  - 数据调用save（）
- 除了插入数据，其他操作的方法都是model直接调用



> **mongoose 的api还是有很多的，这里对于curd列举最实用的api，详细内容自行百度。**
>
> 这里列举的，所有增删改查只有`save`是实例方法，其余都是静态方法



## 增加数据

```javascript
new User({}).save(function(err){})  //User实例方法，参数只能是对象
User.create([]/{},function(err){})	//参数可以是数组或者是对象
```

## 查询数据

```javascript
	//基础使用
	User.find({},function(err,data){});//返回值是数组
	User.findOne({},function(err,data){}) //返回值是对象
	User.count({},function(err,data){})//返回值是数字
	
	//传入复杂条件：（总共十几种用法）	
	User.find({username:{$regex:/g/i}});//正则
	User.find({name:"sun"},{name:1,age:0},function(err,data){})
```

```
db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
)


```



- 对查询结果进行过滤：排序、限制条数、跳过几条（这里的api也有几十个）

```
User.find({},function(err,data){}) 				//返回查到的所有文档

User.find({},function(err,data){}).limit(10)	//返回前10条文档

User.find({},function(err,data){}).sort({age:-1}) // 将返回的文档按照age倒序排列

User.find({},function(err,data){}).skip(10)			//跳过前十条
```

## 更新数据

```javascript
User.update({查询条件},{更新数据},{配置项},function(err，res){})

User.updateOne({},{username:1},function(err){}) 	//将第一条满足条件的文档中的username属性更改为1

User.updateMany({},{username:1},function(err){}) 	//将所有满足条件的文档中的username属性更改为1 
//在没有设置配置项的情况在，只会更新查询条件
//需要设置配置项，才能重置整个文档。此时使用 $set，也是可以只更新查询条件

//配置项自行百度：可以实现重置查询到的文档
upsert: <boolean>, //使用时给true
multi: <boolean>,
```

## 删除数据

```javascript
User.deleteOne({},function(err){})   		//删除第一个满足条件的文档
User.deleteMany({},function(err){})   		//删除所有满足条件的文档

User.remove({},function(){})
```

## 补充：根据`_id`操作

```
User.findById("",function(err,data){})  	//返回值是对象

User.findByIdAndUpdate("",{}，function(err,data){})  	//更新

User.findByIdAndRemove("",function(err,data){})  	//删除

```
