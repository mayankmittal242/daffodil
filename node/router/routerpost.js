var express = require('express');
var router = express.Router();
var postapi = require('../api/apipost');
var userapi = require('../api/api');
var path = require('path');
var multer = require('multer');
let name
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      name = Date.now()+file.originalname
      console.log("name",name);
      //src = file.filename;
      //console.log("src",src); 
      cb(null, name);        
  }
});

var upload = multer({ storage: storage });

router.post('/upload',upload.single('image'),async function(req,res){
	console.log("inside router");
    try{  console.log(req.body);

          let obj = await userapi.findmail(req.body.email)
          
          let data = {
            uploadername : obj[0].firstname +" "+obj[0].lastname,
            email: req.body.email,
            description : req.body.description,
            category : req.body.category,
            imagename : name 
          } 

         console.log(data)
         let d = await postapi.createpost(data);
         console.log("post has been uploaded");
         console.log(d);
         res.send(d); 
        }
   catch(err){
   	     console.log("iniside catch",err);
      	 res.send(err);
   }
});	

router.post('/getpost',async function(req,res){
       //console.log("iniside try block")
  try{ 
       //console.log("req.body",req.body);
       let data = {email:req.body.email};
       let obj = await postapi.findpost(data);
       //console.log("all post data is" , obj);
       res.send(obj);
     }
   catch(err)
   { console.log("iniside catch" , err)
     res.send(err)
   }  
});

router.post('/getall',async function(req,res){
       //console.log("iniside try block")
  try{ let data = {}
       let obj = await postapi.findpost(data);
       //console.log("all post data is" , obj);
       res.send(obj);
     }
   catch(err)
   { //console.log("iniside catch" , err)
     res.send(err)
   }  
});

router.post('/likechange',async function(req,res){
       console.log("iniside try block")
  try{ 
       let obj; 
       console.log("req.body of change",req.body);
       if(req.body.val == 1)
          obj = await postapi.pushlike(req.body);
       else 
          obj = await postapi.pullike(req.body);

       //console.log("all post data is" , obj);
      res.send(obj);
     }
  catch(err)
    { 
       console.log("iniside catch" , err)
        res.send(err)
    }  
});


router.post('/getsinglepost',async function(req,res){
       //console.log("iniside try block")
  try{ let data = {_id:req.body.id} 
       //console.log("req.body",req.body);
       let obj = await postapi.findpost(data);
       console.log("all post data is" , obj);
       res.send(obj);
     }
  catch(err)
    { 
       console.log("iniside catch" , err)
       res.send(err)
    }  
});

router.post('/addcomment',async function(req,res){
       console.log("iniside try block")
  try{ 
       console.log("req.body of comment",req.body);
       let obj = await postapi.addcomment(req.body);
       //console.log("all like post data is" , obj);
       let data = {_id:rew.body.id}
       let newobj  = await postapi.findpost(data)

       res.send(newobj);
     }
  catch(err)
    { 
       console.log("iniside catch" , err)
       res.send(err)
    }  
});

module.exports = router;
