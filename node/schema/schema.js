var mongoose = require('mongoose');
var test = mongoose.Schema({
	firstname: String,
	lastname: String,
	username: {type:String,default:"No name"},
	email: {type: String,unique: true},
	password: String,
    verified: Boolean,
    sex:{type:String,default:"Male"},
    about:{type:String,default:"no description"},
    imagename:{type:String,default:"1521267194579download"}
}) 



module.exports = mongoose.model("userdata",test);

