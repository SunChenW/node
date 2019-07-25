// 引包
var express = require("express")
var bodyParser = require("body-parser")
var router = require("./router/router.js")
var session = require("express-session")

// 创建服务
var app = express()

// 配置服务
app.use("/public",express.static("./public"))
app.use("/node_modules",express.static("./node_modules"))

app.engine("html",require("express-art-template"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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


// 路由
app.use(router)

// 开启服务
app.listen(8080,function(){
	console.log("server is running")
})