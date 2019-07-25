// 引包
var express = require("express")
var User = require("../model/user.js")
var Token = require("../model/token.js")
var Talk = require("../model/talk.js")
var md5 = require("blueimp-md5");

// 创建服务
var app = express()



// 获取路由容器
var router = express.Router()


/*登录 注册 等*/
router.get("/", function(req, res) {
    var user = req.session.user
    console.log(user)
    res.render("index.html", { user })
})

router.get("/register", function(req, res) {
    res.render("register.html")
})

router.post("/register", function(req, res) {
    User.findOne({
            $or: [
                { email: req.body.email },
                { nickname: req.body.nickname }
            ]
        })
        .then(function(data) {
            if (data) {
                res.send({
                    err_code: 1,
                    err_msg: "邮箱或昵称存在"
                })
            } else {
                return User.create(req.body)
            }
        })
        .then(function(data) {
            req.session.user = req.body;
            res.send({
                err_code: 0,
                err_msg: "注册成功"
            })
        })
        .catch(function() {
            res.send({
                err_code: 500,
                err_msg: "内部错误，请稍后重试"
            })
        })
})

router.get("/login", function(req, res) {
    res.render("login.html")
})

router.post("/login", function(req, res) {
    User.findOne({
            email: req.body.email,
            password: req.body.password,

        })
        .then(function(data) {
            if (data) {
                req.session.user = data
                res.send({
                    err_code: 0,
                    err_msg: "登录成功"
                })
            } else {
                res.send({
                    err_code: 1,
                    err_msg: "邮箱或昵称错误"
                })
            }
        })
        .catch(function(err) {
            res.send({
                err_code: 500,
                err_msg: "服务器错误，请稍后重试"
            })
        })
})

router.get("/logout",function(req,res){
	req.session.user = null;
	res.redirect("/login");
})
// 导出router
module.exports = router;