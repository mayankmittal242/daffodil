var database = require('../schema/schema');

module.exports = {

      adduser : function(data){
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
     
       finduser : function(data){
        return new Promise((resolve,reject)=>{
             database.find(data,{__v:0},function(err,result){
                if(err){
                    reject(err);
                }
                else {
                    resolve(result);
                }
             })   
            }) 
        },  


       verify : function(info){
        return new Promise((res,rej)=>{  
            database.update({_id:info},{"verified":true},function(err,result){
                if(err){
                    rej(err);
                }
                else{
                     res(result);
                }
            })
        })
     },


         

      changepassword : function(info){
        return new Promise((res,rej)=>{  
            database.update({_id:info.id},{password:info.new},function(err,result){
                if(err){
                    rej(err);
                }
                else{
                    res(result);
                }
            })
        })
     },


     updateuser : function(info){
        return new Promise((res,rej)=>{  
            database.update({email:info.email},{$set:{username:info.username,about:info.about,imagename:info.imagename,sex:info.sex}},function(err,result){
                if(err){
                    rej(err);
                }
                else{ 
                    res(result);
                }
            })
        })
     },


}   
