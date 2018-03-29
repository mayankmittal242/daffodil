import React from 'react';

class Reset extends React.Component{
  constructor(props)
  {
  	super(props);
  	console.log("reset",this.props.match.params.id)
  	this.state ={
  		new :"",
  		confirm :"",
  		message :"",
  		id: this.props.match.params.id
  	}
  	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event,name)
    {   console.log("inside handleChange")
    	this.setState({
    	 [name]: event.target.value
    	});      
    }

    handleSubmit(e){
    	console.log("inside handleSubmit")
      if(this.state.new !== this.state.confirm)
      	this.setState({message:"both password should be same"})
      else{
      	 e.preventDefault();
         console.log("iniside else");
         fetch("http://localhost:8080/user/reset", {
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
     .then(response => { console.log(response)
                         if(response.length ===1 )
                         { alert("password has been changed")
                           localStorage.setItem('email',response[0].email) 
                           this.props.history.push('/timeline'); 
                         }
                       })
        }
      }
    
 

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Reset Password</h1>
                <ul>
                  <li><span>Enter New Password</span><input type="password" name= "new" placeholder="Enter your new password" onChange = {(e) => this.handleChange(e,"new")}/></li>
                  <li><span>Confirm Password</span><input type="password" name= "confirm" placeholder="Enter your password again" onChange = {(e) => this.handleChange(e,"confirm")}/></li>
                  {this.state.message==="" ?"":<h5>this.state.message</h5>}
                  <li><input type="submit" defaultValue="Submit" onClick = {this.handleSubmit}/></li>
                </ul>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="/images/img_9.png" alt /> </div>
          </div>
        </div>
        <div className="clear" />
      
      </div>
    );
  }
}

export default Reset;