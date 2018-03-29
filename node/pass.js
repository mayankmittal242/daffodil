let googleStrategy = require('passport-google-oauth20').Strategy;
let passport  = require('passport');
let key = require('./auth');
const userapi = require('./api/api');

passport.serializeUser((user,done)=>{
	 console.log("user",user);
	done(null,user[0]._id);
    //console.log("into serializeUser");
})

passport.deserializeUser(async function(id,done){
    try{
    	let info = {_id:id};
        let d = await userapi.finduser(info); 
	    done(null,d);
	   }
	  catch(err)
	  {
	  	console.log("error",err)
	  } 
})

passport.use(
	new googleStrategy({
        clientID: key.google.clientID,
        clientSecret:key.google.clientSecret,
        callbackURL:key.google.callbackURL,
       
    },async function(accessToken,refreshToken,profile,done){

	    console.log("passport callback function is fired")
        console.log("profile info",profile)

        let data = {username:profile.displayName,
                    firstname:profile.name.givenName,
                    lastname:profile.name.familyName,
                    googleid:profile.id,
                    email:profile.emails[0].value,
                    photo:profile._json.image.url
                    }

        console.log("data",data); 
        let d 
        try{  console.log("inside try")
             let info = {email:data.email}
             d = await userapi.finduser(info);
             if(d.length == 1)
                console.log("user already exist");
             else{
                 d = await userapi.adduser(data);
                 console.log("user created")           
                }
             console.log(" user details ",d);  
             done(null,d);	 
           }
          catch(err)
          {
          	console.log("error",err)
          } 
    }
    )
)



	