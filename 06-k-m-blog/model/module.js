var mongoose = require("../mongo/mongo.js")
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	username:{type:String},
	age:{type:String},
	gender:{type:String},
	hobbies:{type:String}
})
//使用定义的数据模型，定义数据模板
var User = mongoose.model("CURD",UserSchema);

// moongoose的api是promise封装的方法，可以直接调用then()
module.exports = User