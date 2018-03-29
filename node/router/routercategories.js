var express = require('express');
var router = express.Router();
var categoryapi = require('../api/apicategori');
var path = require('path');
var multer = require('multer');
let name
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploadscategories')
  },
  filename: function (req, file, cb) {
      name = Date.now()+file.originalname
      console.log("name",name); 
      cb(null, name);        
  }
});

var upload = multer({ storage: storage });

router.post('/upload',upload.single('image'),async function(req,res){
	console.log("inside router");
    try{  console.log(req.body);
          let data = {
            name : req.body.name,
            imagename : name 
          } 

         console.log(data)
         let d = await categoryapi.createcategori(data);
         console.log("category has been uploaded");
         let d1 = await categoryapi.findallcat()
         console.log(d1);
         res.send(d1); 
        }
   catch(err){
   	     console.log("iniside catch",err);
      	 res.send(err);
   }
});	

router.post('/findcategory', async function(req,res){console.log("iniside find category")
  try{
     let d = await categoryapi.findallcat() 
     res.send(d);
     console.log(d); 
  }
  catch(err){
    res.send(err)
  }
})

module.exports = router;