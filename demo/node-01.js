var http = require("http");
var server = http.createServer(function(request,response){
	var url = request.url;
	var method = request.method;

	response.writeHead(200, "ok", {"content-type":"text/html;charset=utf8"})
	response.write("首行</br>")
	response.end("你好，欢迎访问我的服务器")
})
server.listen(8080, function(args) {
	console.log("server is running")
})