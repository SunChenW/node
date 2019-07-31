<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Koa](#koa)
  - [说明](#%E8%AF%B4%E6%98%8E)
  - [基本使用](#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
  - [ctx&ctx.request&ctx.response](#ctxctxrequestctxresponse)
  - [获取get提交的数据](#%E8%8E%B7%E5%8F%96get%E6%8F%90%E4%BA%A4%E7%9A%84%E6%95%B0%E6%8D%AE)
  - [获取post提交的数据](#%E8%8E%B7%E5%8F%96post%E6%8F%90%E4%BA%A4%E7%9A%84%E6%95%B0%E6%8D%AE)
  - [路由代理](#%E8%B7%AF%E7%94%B1%E4%BB%A3%E7%90%86)
  - [静态路由](#%E9%9D%99%E6%80%81%E8%B7%AF%E7%94%B1)
  - [解决跨域问题](#%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98)
- [第三方包](#%E7%AC%AC%E4%B8%89%E6%96%B9%E5%8C%85)
  - [session的使用](#session%E7%9A%84%E4%BD%BF%E7%94%A8)
  - [art-template](#art-template)
  - [脚手架](#%E8%84%9A%E6%89%8B%E6%9E%B6)
  - [koa-router](#koa-router)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Koa

## 说明

```javascript
Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 
通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。
Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。
```

## 基本使用

```javascript
var Koa = require('koa'); //加载koa模块
var app = new Koa(); //实例化Koa对象

//处理客户端的请求请求
//koa中没有内置路由处理功能，只有这一个use()方用来使用中间件处理请求
//中间件中接受两个参数 ctx（封装了请求与响应） next（与express中一样，用来调用下一个可执行的中间件）
//next 当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。
app.use(function(ctx,next){
    //发送响应
    ctx.body = 'Hello Koa';
})

// 监听端口
app.listen(8888,function(){
	console.log("running")
})
```

## ctx&ctx.request&ctx.response

**ctx**

> 每个中间件都接收一个 Koa 的 `Context` 对象，该对象封装了一个传入的 http 消息，并对该消息进行了相应的响应。 `ctx` 通常用作上下文对象的参数名称。
>
> 另外Context` 对象提供了其 `request` 和 `response` 方法的快捷方式。

| 方法/属性                                                    | 作用                                      |
| ------------------------------------------------------------ | ----------------------------------------- |
| ctx.req                                                      | 获取http的request对象（不建议使用）       |
| ctx.res                                                      | 获取http的response对象（不建议使用）      |
| ctx.request                                                  | 获取koa中的request对象                    |
| ctx.response                                                 | 获取koa中的response对象                   |
| ctx.cookies.get(name)                                        | 获取cookies                               |
| ctx.cookies.set（name，value）                               | 设置cookies                               |
| ctx.throw(500)                                               | 抛出一个500/400错误，会自动发送服务端响应 |
|                                                              |                                           |
| **与request别名一致**                                        | **作用**                                  |
| ctx.header                                                   | 获取请求头                                |
| ctx.headers                                                  | 获取请求头                                |
| ctx.method                                                   | 获取请求方式                              |
| ctx.url                                                      | 获取请求的url                             |
| ctx.query                                                    | 获取查询数据（get：对象）                 |
| ctx.querystring                                              | 获取查询数据（get：查询字符串）           |
| ctx.body（测试位获取，建议使用ctx.request.body）             | 获取查询数据（post）                      |
|                                                              |                                           |
| **与response别名一致**                                       | **作用**                                  |
| ctx.body= “你好”                                             | 设置响应数据(响应体)                      |
| ctx.status = "400"                                           | 设置响应状态码                            |
| ctx.type = "html"                                            | 设置响应头                                |
| ctx.is("html")                                               | 判断响应类型是否为指定类型                |
| ctx.redirect("https://www.baidu.com")                        | 设置重定向                                |
| ctx.set('Cache-Control', 'no-cache')                         | 设置单个响应头（无缓存）                  |
| ctx.set({   'Cache-Control': 'no-cache',   'Last-Modified': date }) | 设置多个响应头（无缓存，最后更新时间）    |

## 获取get提交的数据

说明：koa内置了`response.query` API直接获取get提交的数据对象

```
var query = ctx.query;
var query = ctx.querystring;
var query = ctx.request.query;
var query = ctx.request.querystring;

```

## 获取post提交的数据

说明：koa没有内置POST获取请求体的API,这里要使用第三方包`koa-body`实现。

注意:表单提交数据需要保证正确的encytyp。

​	不设置或者是    `enctype="application/x-www-form-urlencoded"`

安装：

```shell
npm i koa-body
```

引入:

```powershell
var  koaBody = require('koa-body')
```

配置及使用：

```javascript
var koa = require('koa')
var koaBody = require('koa-body')
var app = new koa()
//调用koa-body功能
app.use(koaBody())
//获取post提交的数据
app.use(function(ctx){
  console.log(ctx.request.body);
})
//监听端口
app.listen(8080,function(){
    console.log("running")
})
```

## 路由代理

安装：

```shell
npm i koa-route
```

引入:

```powershell
var route  = require("koa-route")
```

配置及使用：

```javascript
var koa = require('koa')
var route  = require("koa-route")
var static = require("koa-static")
var app = new koa()
// 代理get请求
app.use(route.get("/a.jpg",function(ctx){
  console.log("get");
}))

// 代理post请求
app.use(route.post("/",function(ctx){
  console.log("post");
}))
//监听端口
app.listen(8080,function(){
    console.log("running")
})
```



## 静态路由

说明：

- 静态路由的原理就是使用用户请求的地址作为路径的一部分，直接读取文件。文件存在则发送文件（路由结束），文件不存在则可以继续路由。
- 静态路由一般应在所有路由之前

安装：

```javascript
npm i koa-static
```

引入：

```javascript
var static = require("koa-static")
```

使用及配置：

```javascript
var koa = require('koa')
var router  = require("koa-route")
var static = require("koa-static")
var app = new koa()
// 配置及使用静态路由：路由成功则本次本次服务结束，不会执行其他路由
// 直接拼接读取:所以请求的url中不能带/public
app.use(static("./public"))
//监听端口
app.listen(8080,function(){
    console.log("running")
})
```



## 解决跨域问题

说明：

> 同源策略及跨域拦截：浏览器会自动拦截非同源的脚本请求（就是ajax请求）
>
> 同源:http://127.0.0.1:8080  客户端地址与请求的服务器地址以上（协议、ip、端口）都相同才是同源。
>
> 跨域：实现非同源下的ajax请求，称为跨域(请求)

- 实现原理：跨域的的实现需要设置两个响应头，一个是设置允许跨域，另一个是设置哪些请求可以跨域
- 实现方式一：手动设置

```javascript
var koa = require('koa')
var app = new koa()
// 设置响应头：允许跨域 及 允许跨域的请求
app.use(function(ctx,next){
  ctx.response.set({
      //允许跨域
    "Access-Control-Allow-Credentials":"true",
      // 设置被允许跨域的请求有哪些：*代表全部允许
    "Access-Control-Allow-Origin":"*"
  })
  next()
})
//监听端口
app.listen(8080,function(){
    console.log("running")
})
```

- 实现方式二：使用`koa2-cors` 包实现——注意：原理与手动设置一样

  下载：

  ```javascript
  npm i koa2-cors
  ```

  使用方式：

  ```javascript
  var koa = require('koa')
  var cors = require('koa2-cors');
  var app = new koa()
  //允许跨域
  app.use(cors());
  app.use(function(ctx){
    ctx.response.body = "123"
  })
  //监听端口
  app.listen(8080,function(){
      console.log("running")
  })
  ```

# 第三方包

## session的使用

- 下载

```shell
npm install koa-session --save
```

- 引用

```javascript
const session = require('koa-session')                      
```

- 配置（抄的别人的，所以很全面）

```javascript
app.keys = ['some secret hurr'];

const CONFIG = {
key: 'koa:sess', //cookie key (default is koa:sess)
maxAge: 86400000, // cookie 的过期时间 maxAge in ms (default is 1 days)
overwrite: true, //是否可以 overwrite (默认 default true)
httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)
signed: true, //签名默认 true
rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
renew: false, //(boolean) renew session when session is nearly expired,
};

app.use(session(CONFIG, app));
```

- 使用

```javascript
ctx.session.username = 123
var username = ctx.session.username
```

## art-template

- 下载

```shell
npm install --save art-template
npm install --save koa-art-template
```

- 引用

```javascript
const Koa = require('koa');
const render = require('koa-art-template');
```

- 配置

```javascript
render(app, {
root: path.join(__dirname, 'view'), extname: '.art', debug: process.env.NODE_ENV !== 'production' });
```

- 使用

```javascript
app.use(async function (ctx) {
await ctx.render('user');
});
```

## 脚手架

- 下载

```shell
npm install koa-generator -g
```

- 使用脚手架搭建项目

```shell
koa koa_demo                        
```

- 安装项目依赖

```shell
cd koa_demo
npm install
```

- 启动项目

```shell
npm start
```

## koa-router

- 下载及引用

```javascript
//获取router实例
var Router = require("koa-router")
var router = new Router()
```

- 配置：老师没讲，默认！！！
- 使用方式

```javascript
//router 代理路由
router.get("/",function(ctx){})
//将router代理路由挂载到app上
app.use(router.routes())
```

