<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [express](#express)
  - [说明](#%E8%AF%B4%E6%98%8E)
  - [概念问题](#%E6%A6%82%E5%BF%B5%E9%97%AE%E9%A2%98)
  - [基本使用](#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
  - [request & response](#request--response)
    - [request](#request)
    - [response](#response)
  - [获取get提交的数据](#%E8%8E%B7%E5%8F%96get%E6%8F%90%E4%BA%A4%E7%9A%84%E6%95%B0%E6%8D%AE)
  - [获取post提交的数据](#%E8%8E%B7%E5%8F%96post%E6%8F%90%E4%BA%A4%E7%9A%84%E6%95%B0%E6%8D%AE)
  - [静态路由](#%E9%9D%99%E6%80%81%E8%B7%AF%E7%94%B1)
  - [app.Router](#approuter)
  - [解决跨域问题](#%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98)
  - [使用art-template模板](#%E4%BD%BF%E7%94%A8art-template%E6%A8%A1%E6%9D%BF)
- [第三方包](#%E7%AC%AC%E4%B8%89%E6%96%B9%E5%8C%85)
  - [密码加密 ：md5  ：使用超级简单](#%E5%AF%86%E7%A0%81%E5%8A%A0%E5%AF%86-md5--%E4%BD%BF%E7%94%A8%E8%B6%85%E7%BA%A7%E7%AE%80%E5%8D%95)
  - [session:简单使用](#session%E7%AE%80%E5%8D%95%E4%BD%BF%E7%94%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# express

官网很棒：<a href="http://www.expressjs.com.cn/">express官方指南</a>

## 说明

```javascript
express封装了原生node的http模块实现web服务；
express可服务对象，可以使用原生http的所有方法和属性
并且大量的第三方模块都直接兼容express
```

## 概念问题

- 路由：识别不同url请求的过程叫做路由
- 静态路由：把仅仅提供文件的处理过程叫做静态路由（因为提供的文件都是静态文件）
- 中间件：use（）中调用的第三方提供的方法叫做中间件

## 基本使用

```javascript
// 引包及创建web服务
var express = require('express')
var app = express()

//实现路由
app.get('/',function(req,res){})
app.post('/',function(req,res){})

// 监听端口
app.listen(8888,function(){

})
```

## request & response

### request

| req.query   | 获取get方式提交的数据                                 |
| ----------- | ----------------------------------------------------- |
| req.body    | 只有在设置了body-parse中间件之后，req上才会有这个属性 |
| req.cookies | 只有在设置了body-parse中间件之后，req上才会有这个属性 |
| req.path    | 获取请求的路径（pathname）                            |
|             |                                                       |

### response

| res.status(code) | 设置响应状态码 | res.status(404).sendfile('path/to/404.png');                 |
| ---------------- | -------------- | ------------------------------------------------------------ |
| res.set()        |                | res.set('Content-Type', 'text/plain');                       |
|                  |                | res.set({   'Content-Type': 'text/plain',   'Content-Length': '123',   'ETag': '12345' }); |
| res.end()        |                |                                                              |
| res.send()       |                |                                                              |
| res.redirect();  | 重定向         |                                                              |
| res.send()       |                |                                                              |
| res.render()     |                | 设置了渲染引擎后可用                                         |
|                  |                |                                                              |
|                  |                |                                                              |



## 获取get提交的数据

说明：express内置了`response.query` API直接获取get提交的数据对象

```
var query = res.query

```

## 获取post提交的数据

说明：express没有内置POST获取请求体的API,这里要使用第三方包`body-parser`实现。

安装：

```shell
npm i body-parser
```

引入:

```powershell
var  bodyParser = require('body-parser')
```

配置及使用：

```powershell
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// parse application/json
app.use(bodyParser.json())
```

## 静态路由

- 路由：处理不同的请求
- 静态路由:处理仅仅请求（静态）文件的请求

```javascript
app.use(express.static("public"))
//参数为路径   读取文件时使用 public+pathname  作为读取文件的路径
```

## app.Router

说明：

- 用来代理路由，方便模块化设计
- 开发时，一个node js文件做一样事，通过引入模块的方式配合使用。

> 主程序代码：

```javascript
var express = require('express');
var router = require("./router/router.js")
var app = express();
app.use(router);
```

> 路由模块代码

```javascript
var express = require('express');
var app = express();
var router = express.Router();
router.get();
router.post();
module.exports = router;
```



将所有的路由都让router代理，然后app调用use使用router中间件。

这样做是为了方便模块化：主文件只是基本配置及安排工作，具体的步骤都交给其他文件(或者是中间件)，然后调用use，使用这些中间件。

## 解决跨域问题

```
app.use('*', function (req, res, next) {
	res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	next();
});

```



## 使用art-template模板

art模板：

```
//正常使用
{{age}}
//判断变量是否存在
{if user}} 
  <h2>{{user.name}}
{{/if}}

  //循环数据
  {{each user}}
      <span>
          index:{{$index}} <br>
          value:{{$value}}
      </span>
  {{/each}}

```

说明：art-template是一个模板工具，可以实现服务端渲染文件，也可以在客服端渲染数据

安装：

```shell
npm i art-template
npm i express-art-template
```

配置及使用：

```shell
var express = require('express');
var app = express();
//当渲染以.art格式的文件时，使用express-art-template模块
//此处是使用express-art-template模块，因为此模块会依赖art-template，索引两个模块都要下载
app.engine('art', require('express-art-template'));
app.get('/', function (req, res) {
//express为response提供的render方法
//render方法默认是不能使用的，只有在配置了模板引擎之后才能使用
//render方法接受两个参数：模板文件名称	{模板数据}默认会去views文件夹中找到这个文件
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
```

如果想要修改默认的文件目录：

```shell
//第一个参数是views
app.set('views',目录路径)
```
# 第三方包

## 密码加密 ：md5  ：使用超级简单

```javascript
// var md5 = require("blueimp-md5");
// 原始数据
var data = 123456789
// 加密之后的数据
data = md5(data)
// 可以多次加密
data = md5(md5(data))
```

## session:简单使用

> session与cookie的使用方式差不多，一些区别，这里就不写了，用就得了。
>
> session是缓存在服务器端，cookie是存储在浏览器端。
>
> 浏览器关闭，或服务器关闭，session会自动清除。
>
> 一定要注意：session的获取与设置都是使用`req.session.`

> 个人还是推荐使用WebStotage：localStorage、sessionStrage。存储信息更多，操作更加方便。多几行代码而已..............................................................

- 在主程序中配置

```javascript
var session = require("express-session")

app.set('trust proxy', 1) // trust first proxy
app.use(session({
	// 用来加密：值任意写
  secret: 'keyboard cat',
  resave: false,
  // 是否发送默认的总是发送session
  saveUninitialized: true,
  // 要求请求是https：测试肯定不能用啊
  // cookie: { secure: true }
}))
```

- 设置session：发送到客户端

```javascript
req.session.user = user
//req 原来是没有session属性的，这是包扩展的
```

- 获取session

```javascript
var user = req.session.user
```