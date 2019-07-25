// 引包
var express = require("express")
var User = require("../model/module.js")

// 创建服务
var app = express()

// 获取路由容器
var router = express.Router()

/*获取首页		 get /  
 */
router.get("/", function(request, response) {
	User.find({}, function(err, data) {
		if (err) {
			response.sendStatus(500)
		} else {
			response.render("index.html", {
				users: data
			})
		}
	})
})

/*获取 新增页面 get  /post.html  获取更新页面
 */
router.get("/post.html", function(request, response) {
	if (request.query.username) {
		response.render("post.html", {
			is: true,
			username: request.query.username
		})
	} else {
		response.render("post.html", {
			is: false
		})
	}
})

/* 提交新数据  更新数据 post /post
 */
router.post("/post", function(request, response) {
	User.updateOne({
		username: request.body.username
	}, request.body, {
		upsert: true
	}, function(err) {
		if (err) {
			console.log("数据存储失败")
			response.sendStatus(500)
		} else {
			response.redirect("/")
		}
	})
})

/*删除执行数据  get  /delete
 */
router.get("/delete", function(request, response) {
	User.deleteOne({
		username: request.query.username
	}, function(err) {
		if (err) {
			console.log("数据删除失败")
			response.sendStatus(500)
		} else {
			response.redirect("/")
		}
	})
})


// 导出router
module.exports = router