import React from 'react';
import {Link} from 'react-router-dom';

class Signup extends React.Component{
	constructor(props)
    {
      super(props);
 
      this.state={
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        username :"",
        checkbox: false,
        mes_email:""
      }
     this.updateState = this.updateState.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handletoggle = this.handletoggle.bind(this);
     this.handleForm = this.handleForm.bind(this);
    }
    
    componentWillMount()
    {  console.log("inside will mount of signup",this.props)
    	  if(localStorage.getItem('emailrem'))
    	     this.props.history.push('/details/timeline'); 
    }    

    updateState(event,name)
    {   
    	this.setState({
    	 [name]: event.target.value
    	});
    }

    handletoggle(event)
    {   
       this.setState({
         checkbox: true
       })
    }	
     
    handleForm(e){
       let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(this.state.username.length < 6)
         alert("Username is too short");
       else
          if(this.state.password.length < 6) 
             alert("Password  is to short ");
          else
       	 	   if(!this.state.email.match(re))
       	 	 	    alert("Please fill correct email address")
       	 	 	 else 
       	        if(this.state.firstname.length === 0)
       	 	        alert("First name can not be empty");
       	        else 	
                   if(this.state.lastname.length === 0 ) 
                    	 alert("Last name can not be empty")
          	        else
          	         	if(this.state.toggle === false)
       	 	              alert("Please accept all terms and condition");
       	 	           else
       	 	      	     	 this.handleSubmit(e);
       }	 	      	
  
    handleSubmit(e)
    {
      e.preventDefault();
      console.log("handleSubmit");
      fetch("http://localhost:8080/user/signup", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
    })
     .then((response) => {console.log('Success:', response.ok)
                           return(response.json()) }) 
     .catch(error => console.error('Error:', error))
     .then(response => { if(response.err === "successful created")
                          this.props.history.push('/forms/login');   
                        else
                          this.setState({mes_email:response.err})
                       })
    }

	render(){
		return(
			<div>
        <meta charSet="utf-8" />
        <title>Create An Account</title>
        <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
        
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>
                  <li><span>Username</span><input type="text" placeholder="Enter your username" onChange={ (e) => this.updateState( e, 'username')} /></li>
                  <li><span>Password</span><input type="password" placeholder="Enter your password" onChange={ (e) => this.updateState( e, 'password')}/></li>
                  <li><span>Email</span><input type="text" placeholder="Enter your email" onChange={ (e) => this.updateState( e, 'email')}/></li>
                  <h5 style={{color:"red"}}>{this.state.mes_email}</h5>
                  <li><span>First Name</span><input type="text" placeholder="Enter your first name" onChange={ (e) => this.updateState( e, 'firstname')}/></li>
                  <li><span>Last Name</span><input type="text" placeholder="Enter your last name" onChange={ (e) => this.updateState( e, 'lastname')}/></li>
                  <li><input type="checkbox" onClick= {this.handletoggle}/>I agree to Term &amp; Conditions</li>
                  <li><input type="submit" defaultValue="Register" onClick= {this.handleForm}/></li>
                  <li><a href="http://localhost:8080/user/googlelogin"><img src="/images/new.png" alt ="message" style={{height:50 ,width:150}}/></a></li>
                </ul>
                <div className="addtnal_acnt">I already have an account.<Link to='/forms/login'>Login My Account !</Link></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="/images/img_9.png" alt ="message" /> </div>
          </div>
        </div>
        <div className="clear" />
      
      </div>

    )	}
} 

export default Signup;