var database = require('../schema/schemapost');

module.exports = {

      createpost : function(data){
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

      findpost : function(data){
            return new Promise((resolve,reject)=>{
             database.find(data,function(err,result){
                  if(err){
                        reject(err);
                  }
                  else { 
                        resolve(result);
                  }
             })   
            }) 
      },

      
      pushlike : function(data){
            return new Promise((resolve,reject)=>{
             database.update({_id:data.id},{$push:{like:data.email}},function(err,result){
                  if(err){
                        reject(err);
                  }
                  else {
                        resolve(result);
                  }
             })   
            }) 
            },

     pullike : function(data){
            return new Promise((resolve,reject)=>{
             database.update({_id:data.id},{$pull:{like:data.email}},function(err,result){
                  if(err){
                        reject(err);
                  }
                  else { 
                        resolve(result);
                  }
             })   
            }) 
      },

      
      addcomment : function(data){
            return new Promise((resolve,reject)=>{
             database.update({_id:data.id},{$push:{comment:data.comment}},function(err,result){
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
