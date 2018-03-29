import React from 'react';

class Forget extends React.Component{
   constructor(props)
   {
    super(props);
    console.log("this.props of forget",this.props)
    this.state = {email:"",
                  showmailsent:false
                 }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(e)
   {
     this.setState({email:e.target.value})
   }

   handleSubmit(e)
   {  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!this.state.email.match(re))
       alert("Please fill correct email address")
      else        
       {  e.preventDefault();
         console.log("handleSubmit");
         fetch("http://localhost:8080/user/resetmail", {
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
     .then(response => { console.log(response.err)
                         if(response.err ==="email not exists")
                           alert("User Does not exist");
                         else{
                              this.setState({showmailsent : true})
                             }    
                      })
        }
    }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" /> 
        {this.state.showmailsent === true? <div className="popup_sec" id="pop_forgt">
                              <div className="clos_btn"><img src="images/clos.png" alt id="clos_pop" /></div>
                              <div className="pop_hdr">A mail has been send to your e-mail Id for Reset Password Link</div>
                              <div className="man_contnt">
                              <span>Please Check Your Mail Box!</span>
                              <input type="submit" defaultValue="Ok" />
                              </div>
                              </div>
                              :""}


         <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Forgot Password</h1>
                <ul>
                  <li><span>Enter E-mail ID</span><input type="text" placeholder="User@gmail.com" onChange={this.handleChange} /></li>
                  <li><input type="submit" defaultValue="Submit" onClick = {this.handleSubmit} /></li>
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


export default Forget;