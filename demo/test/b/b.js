var fs = require("fs");

module.exports = function(){
	fs.readFile("./a.txt", "utf8", function(err,data) {
		console.log(data)
	})
}