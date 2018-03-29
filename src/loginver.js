import React from 'react';
import {Link} from 'react-router-dom';

class Loginver extends React.Component{
	constructor(props){
		super(props)
         this.state = {
           email : "",
           password : "",
           message: "",
           remember: false

         }
		console.log(this.props.match.params._id);
	    	this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeremember = this.changeremember.bind(this);
	} 

    componentWillMount(){
    	console.log("iniside wiil componentWllMount");
    	fetch("http://localhost:8080/verifyuser", {
        method: "POST",
        body: JSON.stringify(this.props.match.params),
        headers: {
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
       })
     .then((response) => {console.log('Success:',response.ok)
                           return response.json();
                       }) 
     .catch(error => console.error('Error:', error))
     .then(response => {this.setState({email:response.info})})
    }
    
    changeremember(){
      this.setState({remember:true})
    }

     updateState(event,name)
    {   
    	this.setState({
    	 [name]: event.target.value
    	});
      
    }

    handleSubmit(e)
    {
      e.preventDefault();
      console.log("handleSubmit");
      fetch("http://localhost:8080/user/login", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
    })
     .then((response) => {console.log('Success:', response.ok)
                           return (response.json()) }) 
     .catch(error => console.error('Error:', error))
     .then(response => {   
                       this.setState({message:response.data});
                         if(this.state.message === "login succesful")
                          { 
                            if(this.state.remember === true)
                             localStorage.setItem('emailrem',this.state.email) 
                             localStorage.setItem('email',this.state.email)
                             this.props.history.push('/forms/timeline');
                          }
                        })
    }
    

	render(){
		return(
            <div>
        <meta charSet="utf-8" />
        <title>Login Account</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
        
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <ul>
                  <li><span>Email-ID</span><input type="text" value= {this.state.email} /></li>
                  <li><span>Password</span><input type="password" placeholder="Enter your password" onChange={ (e) => this.updateState( e, 'password')}/></li>
                  <h5 style ={{color:"red"}}>{this.state.message}</h5>
                  <li><input type="checkbox" onClick = {this.changeremember}/>Remember Me</li>
                  <li><input type="submit" defaultValue="Log In" onClick =  {this.handleSubmit}/><a href>Forgot Password</a></li>
                  <li><a href="http://localhost:8080/user/googlelogin"><img src="/images/new.png" alt ="message" style={{height:50 ,width:150}}/></a></li> 
                </ul>
                <div className="addtnal_acnt">
                I do not have any account yet.<Link to = '/signup'>Create My Account Now !</Link></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="/images/img_9.png"/> </div>
          </div>
        </div>
        <div className="clear" />
        </div>

			)
	}
}

export default Loginver;  