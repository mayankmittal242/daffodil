const express = require('express');	
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let cookieSession = require('cookie-session');
let passport  = require('passport');
let passportSetup = require('./pass');

const routeruser = require('./router/routeruser');
const routercategories = require('./router/routercategories');
const routerPost = require('./router/routerpost');

mongoose.connect('mongodb://localhost:27017/ppl');
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/uploadscategories'))
app.use(express.static(__dirname+'/uploads'))
app.use(express.static(__dirname+'/uploadsprofilepicture'))

app.use(cookieSession({
	maxAge: 60*1000,
	keys:['bgfngmhmhhnmgh']
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/user",routeruser);
app.use("/category",routercategories);
app.use("/post",routerPost);

app.listen(8080,()=>{console.log('Server Running at 8080')});


	