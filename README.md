# 19年暑假-node

## 参考手册

http://nodejs.cn/api/

## 基本概念

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

## 交互式解释器

> node自带的一个类似于window命令台的系统，可以实现：读取、执行、输出、循环

- 命令

```
tab 列出内置对象
.htlp 列出当前可用命令
.break 退出多行表达式
.clear 退出多行表达式
.save filename 保存代码到文件
.load filename 加载文件中的代码
```

## 模块与包

使用exports+require实现js文件间的数据互通。

## 全局变量

## http模块

- 使用http模块创建一个基本的服务程序

```javascript
var http = require("http");//建立基本的http服务
var url = require("url");//解析url字符串为url对象
var querystring = require("querystring");//解析查询字符串为对象

var server = http.createServer(function(request,response){
    var reqUrl = request.url;//获取请求的url
	var reqMethod = request.method;//获取请求的方式
    
    
	// 设置相应头
	response.writeHead(200, "ok", {
		"Content-Type":"text/plain;charset=utf8"
	})
	// 也是设置响应头

	/*response.statusCode = 200;
	response.setHeader("Content-Type", "text/plain;charset=utf8");*/
	
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



## querystring模块

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

## formidable模块

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

- 作用为使用模板数据
- 需要配合`express-art-template`使用

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

## mime查询biao

{ ".323":"text/h323" ,
  ".3gp":"video/3gpp" ,
  ".aab":"application/x-authoware-bin" ,
  ".aam":"application/x-authoware-map" ,
  ".aas":"application/x-authoware-seg" ,
  ".acx":"application/internet-property-stream" ,
  ".ai":"application/postscript" ,
  ".aif":"audio/x-aiff" ,
  ".aifc":"audio/x-aiff" ,
  ".aiff":"audio/x-aiff" ,
  ".als":"audio/X-Alpha5" ,
  ".amc":"application/x-mpeg" ,
  ".ani":"application/octet-stream" ,
  ".apk":"application/vnd.android.package-archive" ,
  ".asc":"text/plain" ,
  ".asd":"application/astound" ,
  ".asf":"video/x-ms-asf" ,
  ".asn":"application/astound" ,
  ".asp":"application/x-asap" ,
  ".asr":"video/x-ms-asf" ,
  ".asx":"video/x-ms-asf" ,
  ".au":"audio/basic" ,
  ".avb":"application/octet-stream" ,
  ".avi":"video/x-msvideo" ,
  ".awb":"audio/amr-wb" ,
  ".axs":"application/olescript" ,
  ".bas":"text/plain" ,
  ".bcpio":"application/x-bcpio" ,
  ".bin ":"application/octet-stream" ,
  ".bld":"application/bld" ,
  ".bld2":"application/bld2" ,
  ".bmp":"image/bmp" ,
  ".bpk":"application/octet-stream" ,
  ".bz2":"application/x-bzip2" ,
  ".c":"text/plain" ,
  ".cal":"image/x-cals" ,
  ".cat":"application/vnd.ms-pkiseccat" ,
  ".ccn":"application/x-cnc" ,
  ".cco":"application/x-cocoa" ,
  ".cdf":"application/x-cdf" ,
  ".cer":"application/x-x509-ca-cert" ,
  ".cgi":"magnus-internal/cgi" ,
  ".chat":"application/x-chat" ,
  ".class":"application/octet-stream" ,
  ".clp":"application/x-msclip" ,
  ".cmx":"image/x-cmx" ,
  ".co":"application/x-cult3d-object" ,
  ".cod":"image/cis-cod" ,
  ".conf":"text/plain" ,
  ".cpio":"application/x-cpio" ,
  ".cpp":"text/plain" ,
  ".cpt":"application/mac-compactpro" ,
  ".crd":"application/x-mscardfile" ,
  ".crl":"application/pkix-crl" ,
  ".crt":"application/x-x509-ca-cert" ,
  ".csh":"application/x-csh" ,
  ".csm":"chemical/x-csml" ,
  ".csml":"chemical/x-csml" ,
  ".css":"text/css" ,
  ".cur":"application/octet-stream" ,
  ".dcm":"x-lml/x-evm" ,
  ".dcr":"application/x-director" ,
  ".dcx":"image/x-dcx" ,
  ".der":"application/x-x509-ca-cert" ,
  ".dhtml":"text/html" ,
  ".dir":"application/x-director" ,
  ".dll":"application/x-msdownload" ,
  ".dmg":"application/octet-stream" ,
  ".dms":"application/octet-stream" ,
  ".doc":"application/msword" ,
  ".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document" ,
  ".dot":"application/msword" ,
  ".dvi":"application/x-dvi" ,
  ".dwf":"drawing/x-dwf" ,
  ".dwg":"application/x-autocad" ,
  ".dxf":"application/x-autocad" ,
  ".dxr":"application/x-director" ,
  ".ebk":"application/x-expandedbook" ,
  ".emb":"chemical/x-embl-dl-nucleotide" ,
  ".embl":"chemical/x-embl-dl-nucleotide" ,
  ".eps":"application/postscript" ,
  ".epub":"application/epub+zip" ,
  ".eri":"image/x-eri" ,
  ".es":"audio/echospeech" ,
  ".esl":"audio/echospeech" ,
  ".etc":"application/x-earthtime" ,
  ".etx":"text/x-setext" ,
  ".evm":"x-lml/x-evm" ,
  ".evy":"application/envoy" ,
  ".exe":"application/octet-stream" ,
  ".fh4":"image/x-freehand" ,
  ".fh5":"image/x-freehand" ,
  ".fhc":"image/x-freehand" ,
  ".fif":"application/fractals" ,
  ".flr":"x-world/x-vrml" ,
  ".flv":"flv-application/octet-stream" ,
  ".fm":"application/x-maker" ,
  ".fpx":"image/x-fpx" ,
  ".fvi":"video/isivideo" ,
  ".gau":"chemical/x-gaussian-input" ,
  ".gca":"application/x-gca-compressed" ,
  ".gdb":"x-lml/x-gdb" ,
  ".gif":"image/gif" ,
  ".gps":"application/x-gps" ,
  ".gtar":"application/x-gtar" ,
  ".gz":"application/x-gzip" ,
  ".h":"text/plain" ,
  ".hdf":"application/x-hdf" ,
  ".hdm":"text/x-hdml" ,
  ".hdml":"text/x-hdml" ,
  ".hlp":"application/winhlp" ,
  ".hqx":"application/mac-binhex40" ,
  ".hta":"application/hta" ,
  ".htc":"text/x-component" ,
  ".htm":"text/html" ,
  ".html":"text/html" ,
  ".hts":"text/html" ,
  ".htt":"text/webviewhtml" ,
  ".ice":"x-conference/x-cooltalk" ,
  ".ico":"image/x-icon" ,
  ".ief":"image/ief" ,
  ".ifm":"image/gif" ,
  ".ifs":"image/ifs" ,
  ".iii":"application/x-iphone" ,
  ".imy":"audio/melody" ,
  ".ins":"application/x-internet-signup" ,
  ".ips":"application/x-ipscript" ,
  ".ipx":"application/x-ipix" ,
  ".isp":"application/x-internet-signup" ,
  ".it":"audio/x-mod" ,
  ".itz":"audio/x-mod" ,
  ".ivr":"i-world/i-vrml" ,
  ".j2k":"image/j2k" ,
  ".jad":"text/vnd.sun.j2me.app-descriptor" ,
  ".jam":"application/x-jam" ,
  ".jar":"application/java-archive" ,
  ".java":"text/plain" ,
  ".jfif":"image/pipeg" ,
  ".jnlp":"application/x-java-jnlp-file" ,
  ".jpe":"image/jpeg" ,
  ".jpeg":"image/jpeg" ,
  ".jpg":"image/jpeg" ,
  ".jpz":"image/jpeg" ,
  ".js":"application/x-javascript" ,
  ".jwc":"application/jwc" ,
  ".kjx":"application/x-kjx" ,
  ".lak":"x-lml/x-lak" ,
  ".latex":"application/x-latex" ,
  ".lcc":"application/fastman" ,
  ".lcl":"application/x-digitalloca" ,
  ".lcr":"application/x-digitalloca" ,
  ".lgh":"application/lgh" ,
  ".lha":"application/octet-stream" ,
  ".lml":"x-lml/x-lml" ,
  ".lmlpack":"x-lml/x-lmlpack" ,
  ".log":"text/plain" ,
  ".lsf":"video/x-la-asf" ,
  ".lsx":"video/x-la-asf" ,
  ".lzh":"application/octet-stream" ,
  ".m13":"application/x-msmediaview" ,
  ".m14":"application/x-msmediaview" ,
  ".m15":"audio/x-mod" ,
  ".m3u":"audio/x-mpegurl" ,
  ".m3url":"audio/x-mpegurl" ,
  ".m4a":"audio/mp4a-latm" ,
  ".m4b":"audio/mp4a-latm" ,
  ".m4p":"audio/mp4a-latm" ,
  ".m4u":"video/vnd.mpegurl" ,
  ".m4v":"video/x-m4v" ,
  ".ma1":"audio/ma1" ,
  ".ma2":"audio/ma2" ,
  ".ma3":"audio/ma3" ,
  ".ma5":"audio/ma5" ,
  ".man":"application/x-troff-man" ,
  ".map":"magnus-internal/imagemap" ,
  ".mbd":"application/mbedlet" ,
  ".mct":"application/x-mascot" ,
  ".mdb":"application/x-msaccess" ,
  ".mdz":"audio/x-mod" ,
  ".me":"application/x-troff-me" ,
  ".mel":"text/x-vmel" ,
  ".mht":"message/rfc822" ,
  ".mhtml":"message/rfc822" ,
  ".mi":"application/x-mif" ,
  ".mid":"audio/mid" ,
  ".midi":"audio/midi" ,
  ".mif":"application/x-mif" ,
  ".mil":"image/x-cals" ,
  ".mio":"audio/x-mio" ,
  ".mmf":"application/x-skt-lbs" ,
  ".mng":"video/x-mng" ,
  ".mny":"application/x-msmoney" ,
  ".moc":"application/x-mocha" ,
  ".mocha":"application/x-mocha" ,
  ".mod":"audio/x-mod" ,
  ".mof":"application/x-yumekara" ,
  ".mol":"chemical/x-mdl-molfile" ,
  ".mop":"chemical/x-mopac-input" ,
  ".mov":"video/quicktime" ,
  ".movie":"video/x-sgi-movie" ,
  ".mp2":"video/mpeg" ,
  ".mp3":"audio/mpeg" ,
  ".mp4":"video/mp4" ,
  ".mpa":"video/mpeg" ,
  ".mpc":"application/vnd.mpohun.certificate" ,
  ".mpe":"video/mpeg" ,
  ".mpeg":"video/mpeg" ,
  ".mpg":"video/mpeg" ,
  ".mpg4":"video/mp4" ,
  ".mpga":"audio/mpeg" ,
  ".mpn":"application/vnd.mophun.application" ,
  ".mpp":"application/vnd.ms-project" ,
  ".mps":"application/x-mapserver" ,
  ".mpv2":"video/mpeg" ,
  ".mrl":"text/x-mrml" ,
  ".mrm":"application/x-mrm" ,
  ".ms":"application/x-troff-ms" ,
  ".msg":"application/vnd.ms-outlook" ,
  ".mts":"application/metastream" ,
  ".mtx":"application/metastream" ,
  ".mtz":"application/metastream" ,
  ".mvb":"application/x-msmediaview" ,
  ".mzv":"application/metastream" ,
  ".nar":"application/zip" ,
  ".nbmp":"image/nbmp" ,
  ".nc":"application/x-netcdf" ,
  ".ndb":"x-lml/x-ndb" ,
  ".ndwn":"application/ndwn" ,
  ".nif":"application/x-nif" ,
  ".nmz":"application/x-scream" ,
  ".nokia-op-logo":"image/vnd.nok-oplogo-color" ,
  ".npx":"application/x-netfpx" ,
  ".nsnd":"audio/nsnd" ,
  ".nva":"application/x-neva1" ,
  ".nws":"message/rfc822" ,
  ".oda":"application/oda" ,
  ".ogg":"audio/ogg" ,
  ".oom":"application/x-AtlasMate-Plugin" ,
  ".p10":"application/pkcs10" ,
  ".p12":"application/x-pkcs12" ,
  ".p7b":"application/x-pkcs7-certificates" ,
  ".p7c":"application/x-pkcs7-mime" ,
  ".p7m":"application/x-pkcs7-mime" ,
  ".p7r":"application/x-pkcs7-certreqresp" ,
  ".p7s":"application/x-pkcs7-signature" ,
  ".pac":"audio/x-pac" ,
  ".pae":"audio/x-epac" ,
  ".pan":"application/x-pan" ,
  ".pbm":"image/x-portable-bitmap" ,
  ".pcx":"image/x-pcx" ,
  ".pda":"image/x-pda" ,
  ".pdb":"chemical/x-pdb" ,
  ".pdf":"application/pdf" ,
  ".pfr":"application/font-tdpfr" ,
  ".pfx":"application/x-pkcs12" ,
  ".pgm":"image/x-portable-graymap" ,
  ".pict":"image/x-pict" ,
  ".pko":"application/ynd.ms-pkipko" ,
  ".pm":"application/x-perl" ,
  ".pma":"application/x-perfmon" ,
  ".pmc":"application/x-perfmon" ,
  ".pmd":"application/x-pmd" ,
  ".pml":"application/x-perfmon" ,
  ".pmr":"application/x-perfmon" ,
  ".pmw":"application/x-perfmon" ,
  ".png":"image/png" ,
  ".pnm":"image/x-portable-anymap" ,
  ".pnz":"image/png" ,
  ".pot,":"application/vnd.ms-powerpoint" ,
  ".ppm":"image/x-portable-pixmap" ,
  ".pps":"application/vnd.ms-powerpoint" ,
  ".ppt":"application/vnd.ms-powerpoint" ,
  ".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation" ,
  ".pqf":"application/x-cprplayer" ,
  ".pqi":"application/cprplayer" ,
  ".prc":"application/x-prc" ,
  ".prf":"application/pics-rules" ,
  ".prop":"text/plain" ,
  ".proxy":"application/x-ns-proxy-autoconfig" ,
  ".ps":"application/postscript" ,
  ".ptlk":"application/listenup" ,
  ".pub":"application/x-mspublisher" ,
  ".pvx":"video/x-pv-pvx" ,
  ".qcp":"audio/vnd.qcelp" ,
  ".qt":"video/quicktime" ,
  ".qti":"image/x-quicktime" ,
  ".qtif":"image/x-quicktime" ,
  ".r3t":"text/vnd.rn-realtext3d" ,
  ".ra":"audio/x-pn-realaudio" ,
  ".ram":"audio/x-pn-realaudio" ,
  ".rar":"application/octet-stream" ,
  ".ras":"image/x-cmu-raster" ,
  ".rc":"text/plain" ,
  ".rdf":"application/rdf+xml" ,
  ".rf":"image/vnd.rn-realflash" ,
  ".rgb":"image/x-rgb" ,
  ".rlf":"application/x-richlink" ,
  ".rm":"audio/x-pn-realaudio" ,
  ".rmf":"audio/x-rmf" ,
  ".rmi":"audio/mid" ,
  ".rmm":"audio/x-pn-realaudio" ,
  ".rmvb":"audio/x-pn-realaudio" ,
  ".rnx":"application/vnd.rn-realplayer" ,
  ".roff":"application/x-troff" ,
  ".rp":"image/vnd.rn-realpix" ,
  ".rpm":"audio/x-pn-realaudio-plugin" ,
  ".rt":"text/vnd.rn-realtext" ,
  ".rte":"x-lml/x-gps" ,
  ".rtf":"application/rtf" ,
  ".rtg":"application/metastream" ,
  ".rtx":"text/richtext" ,
  ".rv":"video/vnd.rn-realvideo" ,
  ".rwc":"application/x-rogerwilco" ,
  ".s3m":"audio/x-mod" ,
  ".s3z":"audio/x-mod" ,
  ".sca":"application/x-supercard" ,
  ".scd":"application/x-msschedule" ,
  ".sct":"text/scriptlet" ,
  ".sdf":"application/e-score" ,
  ".sea":"application/x-stuffit" ,
  ".setpay":"application/set-payment-initiation" ,
  ".setreg":"application/set-registration-initiation" ,
  ".sgm":"text/x-sgml" ,
  ".sgml":"text/x-sgml" ,
  ".sh":"application/x-sh" ,
  ".shar":"application/x-shar" ,
  ".shtml":"magnus-internal/parsed-html" ,
  ".shw":"application/presentations" ,
  ".si6":"image/si6" ,
  ".si7":"image/vnd.stiwap.sis" ,
  ".si9":"image/vnd.lgtwap.sis" ,
  ".sis":"application/vnd.symbian.install" ,
  ".sit":"application/x-stuffit" ,
  ".skd":"application/x-Koan" ,
  ".skm":"application/x-Koan" ,
  ".skp":"application/x-Koan" ,
  ".skt":"application/x-Koan" ,
  ".slc":"application/x-salsa" ,
  ".smd":"audio/x-smd" ,
  ".smi":"application/smil" ,
  ".smil":"application/smil" ,
  ".smp":"application/studiom" ,
  ".smz":"audio/x-smd" ,
  ".snd":"audio/basic" ,
  ".spc":"application/x-pkcs7-certificates" ,
  ".spl":"application/futuresplash" ,
  ".spr":"application/x-sprite" ,
  ".sprite":"application/x-sprite" ,
  ".sdp":"application/sdp" ,
  ".spt":"application/x-spt" ,
  ".src":"application/x-wais-source" ,
  ".sst":"application/vnd.ms-pkicertstore" ,
  ".stk":"application/hyperstudio" ,
  ".stl":"application/vnd.ms-pkistl" ,
  ".stm":"text/html" ,
  ".svg":"image/svg+xml" ,
  ".sv4cpio":"application/x-sv4cpio" ,
  ".sv4crc":"application/x-sv4crc" ,
  ".svf":"image/vnd" ,
  ".svg":"image/svg+xml" ,
  ".svh":"image/svh" ,
  ".svr":"x-world/x-svr" ,
  ".swf":"application/x-shockwave-flash" ,
  ".swfl":"application/x-shockwave-flash" ,
  ".t":"application/x-troff" ,
  ".tad":"application/octet-stream" ,
  ".talk":"text/x-speech" ,
  ".tar":"application/x-tar" ,
  ".taz":"application/x-tar" ,
  ".tbp":"application/x-timbuktu" ,
  ".tbt":"application/x-timbuktu" ,
  ".tcl":"application/x-tcl" ,
  ".tex":"application/x-tex" ,
  ".texi":"application/x-texinfo" ,
  ".texinfo":"application/x-texinfo" ,
  ".tgz":"application/x-compressed" ,
  ".thm":"application/vnd.eri.thm" ,
  ".tif":"image/tiff" ,
  ".tiff":"image/tiff" ,
  ".tki":"application/x-tkined" ,
  ".tkined":"application/x-tkined" ,
  ".toc":"application/toc" ,
  ".toy":"image/toy" ,
  ".tr":"application/x-troff" ,
  ".trk":"x-lml/x-gps" ,
  ".trm":"application/x-msterminal" ,
  ".tsi":"audio/tsplayer" ,
  ".tsp":"application/dsptype" ,
  ".tsv":"text/tab-separated-values" ,
  ".ttf":"application/octet-stream" ,
  ".ttz":"application/t-time" ,
  ".txt":"text/plain" ,
  ".uls":"text/iuls" ,
  ".ult":"audio/x-mod" ,
  ".ustar":"application/x-ustar" ,
  ".uu":"application/x-uuencode" ,
  ".uue":"application/x-uuencode" ,
  ".vcd":"application/x-cdlink" ,
  ".vcf":"text/x-vcard" ,
  ".vdo":"video/vdo" ,
  ".vib":"audio/vib" ,
  ".viv":"video/vivo" ,
  ".vivo":"video/vivo" ,
  ".vmd":"application/vocaltec-media-desc" ,
  ".vmf":"application/vocaltec-media-file" ,
  ".vmi":"application/x-dreamcast-vms-info" ,
  ".vms":"application/x-dreamcast-vms" ,
  ".vox":"audio/voxware" ,
  ".vqe":"audio/x-twinvq-plugin" ,
  ".vqf":"audio/x-twinvq" ,
  ".vql":"audio/x-twinvq" ,
  ".vre":"x-world/x-vream" ,
  ".vrml":"x-world/x-vrml" ,
  ".vrt":"x-world/x-vrt" ,
  ".vrw":"x-world/x-vream" ,
  ".vts":"workbook/formulaone" ,
  ".wav":"audio/x-wav" ,
  ".wax":"audio/x-ms-wax" ,
  ".wbmp":"image/vnd.wap.wbmp" ,
  ".wcm":"application/vnd.ms-works" ,
  ".wdb":"application/vnd.ms-works" ,
  ".web":"application/vnd.xara" ,
  ".wi":"image/wavelet" ,
  ".wis":"application/x-InstallShield" ,
  ".wks":"application/vnd.ms-works" ,
  ".wm":"video/x-ms-wm" ,
  ".wma":"audio/x-ms-wma" ,
  ".wmd":"application/x-ms-wmd" ,
  ".wmf":"application/x-msmetafile" ,
  ".wml":"text/vnd.wap.wml" ,
  ".wmlc":"application/vnd.wap.wmlc" ,
  ".wmls":"text/vnd.wap.wmlscript" ,
  ".wmlsc":"application/vnd.wap.wmlscriptc" ,
  ".wmlscript":"text/vnd.wap.wmlscript" ,
  ".wmv":"audio/x-ms-wmv" ,
  ".wmx":"video/x-ms-wmx" ,
  ".wmz":"application/x-ms-wmz" ,
  ".wpng":"image/x-up-wpng" ,
  ".wps":"application/vnd.ms-works" ,
  ".wpt":"x-lml/x-gps" ,
  ".wri":"application/x-mswrite" ,
  ".wrl":"x-world/x-vrml" ,
  ".wrz":"x-world/x-vrml" ,
  ".ws":"text/vnd.wap.wmlscript" ,
  ".wsc":"application/vnd.wap.wmlscriptc" ,
  ".wv":"video/wavelet" ,
  ".wvx":"video/x-ms-wvx" ,
  ".wxl":"application/x-wxl" ,
  ".x-gzip":"application/x-gzip" ,
  ".xaf":"x-world/x-vrml" ,
  ".xar":"application/vnd.xara" ,
  ".xbm":"image/x-xbitmap" ,
  ".xdm":"application/x-xdma" ,
  ".xdma":"application/x-xdma" ,
  ".xdw":"application/vnd.fujixerox.docuworks" ,
  ".xht":"application/xhtml+xml" ,
  ".xhtm":"application/xhtml+xml" ,
  ".xhtml":"application/xhtml+xml" ,
  ".xla":"application/vnd.ms-excel" ,
  ".xlc":"application/vnd.ms-excel" ,
  ".xll":"application/x-excel" ,
  ".xlm":"application/vnd.ms-excel" ,
  ".xls":"application/vnd.ms-excel" ,
  ".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ,
  ".xlt":"application/vnd.ms-excel" ,
  ".xlw":"application/vnd.ms-excel" ,
  ".xm":"audio/x-mod" ,
  ".xml":"text/plain",
  ".xml":"application/xml",
  ".xmz":"audio/x-mod" ,
  ".xof":"x-world/x-vrml" ,
  ".xpi":"application/x-xpinstall" ,
  ".xpm":"image/x-xpixmap" ,
  ".xsit":"text/xml" ,
  ".xsl":"text/xml" ,
  ".xul":"text/xul" ,
  ".xwd":"image/x-xwindowdump" ,
  ".xyz":"chemical/x-pdb" ,
  ".yz1":"application/x-yz1" ,
  ".z":"application/x-compress" ,
  ".zac":"application/x-zaurus-zac" ,
  ".zip":"application/zip" ,
  ".json":"application/json"
}

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

## 插入数据

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
  - String
  - Number
  - Date
  - Buffer
  - Boolean
  - Array
- 插入数据的操作时特殊的：
  - 使用model对象生成数据
  - 数据调用save（）
- 除了插入数据，其他操作的方法都是model直接调用



## 查询数据

- 查询数据

```javascript
	User.find({},function(err,data){});
	User.find({username:{$regex:/g/i}});
	User.findId({},function(err,data){});
	User.find({name:"sun"},{name:1,age:0},function(err,data){})
	User.count({},function(err,num){})

	findOne()

	//回调函数中，得到的是数组形式的数据
```

## 更新数据

```javascript
User.update({查询条件},{更新数据},{配置项},function(err，res){})
User.update({name:"sunn"},{age:20},{upsert:true,multi:true},function(err,res){
		if(err){
			console.log("错误")
		}else{
			console.log(res)
		}
	})
```

## 删除数据

```javascript
User.remove({查询条件}，function(err,res){})
findOneAndRemove()
```

# express

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

##request & response

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
| res.render()     |                |                                                              |
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
//配置 body-parser
//只要加入这个配置，request请求对象上就会多出一个属性：body
//通过req.body来获取POST请求体的数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

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

使用方式：

```javascript
var express = require('express');
var app = express();

var rouer = app.Router();

router.get();
router.post();

app.use(router);
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

```javascript
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

# koa

## 说明

```javascript
Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。
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
| ctx.body                                                     | 获取查询数据（post）                      |
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
var  bodyParser = require('koa-body')
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
var router  = require("koa-route")
var static = require("koa-static")
var app = new koa()
// 代理get请求
app.use(router.get("/a.jpg",function(ctx){
  console.log("get");
}))

// 代理post请求
app.use(router.post("/",function(ctx){
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

  