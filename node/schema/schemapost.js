var mongoose = require('mongoose');
var info = mongoose.Schema({
	uploadername :{type: String},
	email: {type: String , unique:false},
	date: {type: Date , default : Date.now()},
	description : {type: String},
	category :{type: String},
	imagename : {type : String},
	like :{type: Array},
    comment: {type:Array}
}) 



module.exports = mongoose.model("postdata",info);

