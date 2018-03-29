var mongoose = require('mongoose');
var info = mongoose.Schema({
	name :{type: String, unique:true},
	imagename : {type : String},

}) 



module.exports = mongoose.model("categoriesdata",info);

