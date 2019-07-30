var mongoose = require("mongoose");

// 定义变量存储 mongoDB软件的连接地址
// var DB_URL =  "mongodb://locahost:27017";
// mongoose.connect("DB_URL");
mongoose.connect("mongodb://127.0.0.1:27017/blog");
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
module.exports = mongoose;