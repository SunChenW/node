var mongoose = require("../mongo/mongo.js")
var Schema = mongoose.Schema;
var TokenSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	token:{
		type:String,
		required:true
	},
	create_time:{
		type:Number,
		required:true
	},
	lose_time:{
		type:Number,
		required:true
	}
})
//使用定义的数据模型，定义数据模板
var Token = mongoose.model("TOKEN",TokenSchema);

// moongoose的api是promise封装的方法，可以直接调用then()
module.exports = Token