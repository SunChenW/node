// 引包
var express = require("express")
var bodyParser = require("body-parser")
var router = require("./router/router.js")
var path = require("path")
// 创建服务
var app = express()

// 配置服务
app.use("/public",express.static(path.join(__dirname,"./public")))
app.use("/node_modules",express.static(path.join(__dirname,"./node_modules")))

app.engine("html",require("express-art-template"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 路由
app.use(router)

// 开启服务
app.listen(8080,function(){
	console.log("server is running")
})