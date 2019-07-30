var Koa = require("koa")
var koaBody = require("koa-body")
var static = require("koa-static")
var cors = require("koa2-cors")
var route = require("koa-route")
var render = require("koa-art-template")
var path = require("path")
var User = require("./model/module.js")

var app = new Koa()

app.use(static(__dirname))
app.use(koaBody())
app.use(cors())
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});


app.use(route.get("/",async function(ctx) {

	var users = await User.find()
	ctx.render("index.html",{users})
}))

app.use(route.get("/post.html", function(ctx) {
	if(ctx.query.username){
		ctx.render("post.html",{is:true,username:ctx.query.username})
	}else{
		ctx.render("post.html")
	}
	
}))

app.use(route.post("/post",async function(ctx){
	// console.log(ctx.request.body.username)
	var count = await User.count({username:ctx.request.body.username})
	// console.log("现有用户数据" + count +"条")
	if(count==0){
		await User.create(ctx.request.body)
	}else{
		await User.updateOne({username:ctx.request.body.username},ctx.request.body,{upsert:true})
	}
	ctx.response.redirect("/")
}))

app.use(route.get("/delete",async function(ctx){
	await User.deleteOne({username:ctx.request.query.username},function(err){
		if(err){
			ctx.status = 500
		}else{
			ctx.response.redirect("/")
		}
	})
}))


app.listen(8080, function() {
    console.log("server is running")
})