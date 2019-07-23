var http = require("http");
var fs = require("fs")
var url = require("url");
var template = require("art-template");
// 创建服务器
var server = http.createServer(function(request,response){
    // 获取客户端信息
    var userIP = request.socket.remoteAddress;
    var userURL = request.url;
    var usrMethod = request.method;
    // 分析请求：拆分url 得到pathname级query
    userURL = url.parse(userURL,true)
    var pathname = userURL.pathname
    // console.log(pathname)
    // 处理favicon.ico
    if(pathname=="/favicon.ico"){
      response.statusCode = "404"
       response.end()
       return
    }
    // 处理 / 请求
    if(pathname=="/"){
      pathname = "/views/index.html"
    }
    // 实现静态路由
    fs.readFile(__dirname + pathname, function(err,data) {
        // 文件读取失败  判断其他功能
        if(err){
         if(pathname == "/pinglun"){
          var query = userURL.query
          query.dateTime = new Date().toLocaleString()
          query =JSON.stringify(query) 
              // 获取留言信息：用户名，留言内容
              fs.writeFile("./data.txt", query + "+", {flag:"a"}, function(err){
                if(err){
                  // 存储数据失败：重定向 到404 页面
                  response.writeHead(302,{
                    'Location': 'http://127.0.0.1:8080/views/404.html'
                  })
                  response.end()
                }else{
                  // 存储数据成功：重定向 到 首页
                  response.writeHead(302,{
                    'Location': 'http://127.0.0.1:8080/'
                  })
                  response.end()
                }
              });
            }else{
              response.writeHead(302,{
                'Location': 'http://127.0.0.1:8080/views/404.html'
              })
              response.end()
            }
          }else{
          // 文件读取成功，判断是不是请求的首页，如果是还要进行服务端渲染
          if(pathname=="/views/index.html"){
            // 之前读取到的是二进制，转换为字符串，进行模板化处理
            data = data.toString();
            var userMsg = fs.readFileSync("./data.txt", "utf8");
            if(!userMsg){
              userMsg = []
              data = template.render(data,{comments:userMsg})
            }else{
              userMsg = userMsg.split("+")
              userMsg.pop()
              userMsg = userMsg.map(function(item){
                return JSON.parse(item)
              })
              data = template.render(data,{comments:userMsg})
            }
          }
          response.end(data)
        }
      })
  })
// 服务器绑定端口
server.listen(8080, function(args) {
  console.log("server is running")
})

