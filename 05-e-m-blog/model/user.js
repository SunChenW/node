var mongoose = require("../mongo/mongo.js")
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	nickname:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	created_time:{
		type:Date,
		// 这里使用Date的静态方法.now(),不能写调用，当存储数据时会自动调用
		default:Date.now
	},
	last_modified_time:{
		type:Date,
		default:Date.now
	},
	// 头像
	avatar:{
		type:String,
		default:"/public/img/avatar-default.png"
	},
	// 个人介绍
	introduce:{
		type:String,
		default:""
	},
	// 头像
	gender:{
		type:Number,
		// enum：枚举，可选值
		enum:[-1,0,1],
		default:-1
	},
	// 生日
	birthday:{
		type:Date
	},
	// 状态:由管理原设置，个人用户不能更改
	status:{
		type:Number,
		/*
			0 :正常
			1：无法评论
			2：无法登陆
		*/
		enum:[0,1,2],
		default:0
	}
})
//使用定义的数据模型，定义数据模板
var User = mongoose.model("USER",UserSchema);

// moongoose的api是promise封装的方法，可以直接调用then()
module.exports = User