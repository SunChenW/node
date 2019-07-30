# 博客系统

## 路由设计

| 路由      | 方式 | 参数                      | 响应                                                | 权限 | 备注         |      |
| --------- | ---- | ------------------------- | --------------------------------------------------- | ---- | ------------ | ---- |
| /         | get  |                           |                                                     |      | 渲染首页     |      |
| /register | get  |                           |                                                     |      | 渲染注册页面 |      |
| /register | post | email、nickname、password | err_code：0/1/500：成功、邮箱或昵称存在、服务器错误 |      | 处理注册请求 |      |
| /login    | get  |                           |                                                     |      | 渲染登录页面 |      |
| /login    | post | email、password           |                                                     |      | 处理登录请求 |      |
| /logout   | get  |                           |                                                     |      | 退出登录     |      |
|           |      |                           |                                                     |      |              |      |
|           |      |                           |                                                     |      |              |      |
|           |      |                           |                                                     |      |              |      |

## 用户信息

```javascript
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
		// enum：枚举，可选值  -1：保密 0：男 1：女
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
```

