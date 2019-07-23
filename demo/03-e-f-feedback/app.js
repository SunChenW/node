// 引包及配置
var express = require("express")
var fs = require("fs");
var app = express();
app.engine("html",require("express-art-template"))
app.use("/public",express.static("./public"));

//路由  /
app.get("/",function(request,response){
  fs.readFile("./data.txt", "utf8", function(err,data){
    if(!err){
      data = data.split("+")
      data.pop()
      data = data.map(function(item){
        return JSON.parse(item)
      })
      response.render("index.html",{comments:data})
    }else{
      console.log("用户信息读取失败")
      response.send("用户信息读取失败") 
    }
  });
})

// 路由 /post
app.get("/post.html",function(request,response){
  response.render("post.html")
})

//路由  /pinglun
app.get("/pinglun",function(request,response){
  var query = request.query;
  query.dateTime = new Date().toLocaleString()
  query =JSON.stringify(query) 
  // 获取留言信息：用户名，留言内容
  fs.writeFile("./data.txt", query + "+", {flag:"a"}, function(err){
    if(err){
      console.log("用户信息写入失败")
      response.send("用户信息写入失败")  
    }else{
      response.redirect("/");
    }
  });
})

app.get("/favicon.ico",function(request,response){
  response.sendStatus(404);
})

app.use("/",function(request,response){
  response.status(404);
  response.render("404.html")
})
// 服务器绑定端口
app.listen(8080, function(args) {
  console.log("server is running")
})

