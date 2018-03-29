var database = require('../schema/schemacategories');

module.exports = {

      createcategori : function(data){
      	return new Promise((resolve,reject)=>{
             database.create(data,function(err,result){
             	if(err){
             		reject(err);
             	}
             	else { 
             		resolve(result);
             	}
             })   
         	}) 
      	},


      findallcat : function(data){
            return new Promise((resolve,reject)=>{ console.log("inside api")
             database.find({},{__v:0,_id:0},function(err,result){
                  if(err){
                        reject(err);
                  }
                  else { 
                        resolve(result);
                  }
             })   
            }) 
            }           	
     }