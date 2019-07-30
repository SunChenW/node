var mongoose = require("../mongo/mongo.js")
var Schema = mongoose.Schema;
var TalkSchema = new Schema({
	email:{type:String},
	nickname:{type:String},
	password:{type:String}
})
//使用定义的数据模型，定义数据模板
var Talk = mongoose.model("TALK",TalkSchema);

// moongoose的api是promise封装的方法，可以直接调用then()
module.exports = Talk