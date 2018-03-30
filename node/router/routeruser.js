var express = require('express');
var router = express.Router();
var userapi = require('../api/api');
var nodemailer = require('nodemailer'); 
let passport = require('passport');
var path = require('path');
var multer = require('multer');
let name;

router.get('/googlelogin',passport.authenticate('google',{
    scope:['profile','email']
   }));

router.get('/google/callback',passport.authenticate('google'),function(req,res){
    console.log("email",req.user[0].email)
    res.redirect("http://localhost:3000/details/timeline/"+req.user[0].email);
   })

   
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploadsprofilepicture')
  },
  filename: function (req, file, cb) {
      name = Date.now()+file.originalname
      cb(null, name);        
  }
});

let upload = multer({ storage: storage });

router.post('/upload',upload.single('image'),async function(req,res){
   console.log("inisde upload")
   try{  
        let data = {
            username : req.body.username,
            email: req.body.email,
            about : req.body.about,
            sex : req.body.sex,
            imagename : name 
          } 
 
        let d = await userapi.updateuser(data);
       // console.log("updated result is ",d)
        if(d.ok === 1)
         { let info = {email:data.email}
           let d1 = await userapi.finduser(info);  
           console.log("updated detail of user are ",d1)
           res.send(d1);
         }
      }
   catch(err){
    console.log("error",err)
   }
});

 
router.post('/signup',async function(req,res){
	console.log("inside signup");
    try{  let info = {email:req.bidy.email}
         let d = await userapi.finduser(info);
         //console.log(d);
          if(d.length == 1){
          console.log('email already exists'); 
          res.send({"err" :"user already exists"})
          }
          else{
         let r = await userapi.adduser(req.body);
         //console.log("user data is", r);
         //console.log(r)
         res.send({"err":"successful created"}); 

           nodemailer.createTestAccount((err,account)=>{

           let transporter = nodemailer.createTransport({
             service : 'gmail',
             auth : {
             user: 'mayankmittal242@gmail.com',
             pass: ''
              }
             });
             
            let text1 = "for verification click on http://localhost:3000/login/";
            text1 += r._id;
            console.log(text1);

          let mailoption ={
            from : 'mayankmittal242@gmail.com',
            to: req.body.email,
            subject: 'Signup verification',
            text: text1 
            };

            transporter.sendMail(mailoption , (err,info)=>{
            if(err){
              return console.log(err);
            }
            else{  
              console.log("mail sent",info);
            } 

           });
         });
        }
      }
    catch(err){
    	//res.send(err)
    }


});


router.post('/verifyuser',async function(req,res){
  console.log('inside verify user',req.body._id);
  try{ 
        
          let r1 = await userapi.verify(req.body._id);    
          //console.log(r1);
           let info = {_id:req.body._id}
          let r2 = await userapi.finduser(info);
          console.log("info",r2[0].email);
          res.send({"info":r2[0].email});
  }
  catch(err){
    res.send(err);
  }
});


router.post('/login',async function(request,response){
    console.log('inside login');
    try{  let info = {email:request.body.email}
          let r = await userapi.finduser(info);
          //console.log("data",r)
          //console.log("type of", Array.isArray  (r));

          //console.log("length",r.length);
          if(r.length === 0){
            console.log("email not exist");
            response.send({"data":"email not exist"});
            }else if(r[0].verified == false){
              console.log("verification is not done")
              response.send({"data":"verification is not done"})
             }
            else
               if(r[0].password == request.body.password )
               {
                console.log('login successful')
                response.send({"data":"login succesful"}); 
               }
               else
                 response.send({"data":"invalid password"});
         }       
      catch(err){
       	response.send(err);
      }
});

router.post('/finduser',async function(req,res){
  //console.log('inside find user',req.body);
  try{ 
         let info = {email:req.body.email}
          let r1 = await userapi.finduser(info);    
          console.log("initial user data is",r1);;
          res.send(r1);
  }
  catch(err){
    res.send(err);
  }
});

router.post('/resetmail',async function(req,res){
  let d;
    try{  let info = {email:req.body.email}
          d = await userapi.finduser(info);
          console.log(d);
          if(d.length != 1){
          console.log('email not exists'); 
          res.send({"err" :"email not exists"})
          }
          else{
           
              nodemailer.createTestAccount((err,account)=>{

              let transporter = nodemailer.createTransport({
              service : 'gmail',
              auth : {
              user: 'mayankmittal242@gmail.com',
              pass: ''
              }
             });
             
            let text1 = "for verification click on http://localhost:3000/reset/";
            text1 += d[0]._id;
            console.log(text1);

            let mailoption ={
             from : 'mayankmittal242@gmail.com',
             to: req.body.email,
             subject: 'Signup verification',
             text: text1 
             };

            transporter.sendMail(mailoption , (err,info)=>{
            if(err){
              return console.log(error);
            }
            else{
              console.log("mail sent");
              res.send({"err" :"Mail sent"})   
            } 
          });
         });
        }
      }
    catch(err){
      //res.send(err)
    }
});


router.post('/reset',async function(req,res){
  console.log('inside verify user',req.body);
  try{  
       let r1 = await userapi.changepassword(req.body);    
       //console.log(r1);
       let info = {_id:request.body.id}
       let r2 = await userapi.finduser(info)
       //console.log(r2)
       res.send(r2);
     }
     catch(err){
        res.send(err);
  }
});


module.exports = router; 