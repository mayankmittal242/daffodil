import React from 'react';
import Dropzone from 'react-dropzone';

class Edit extends React.Component{
	constructor(props)
	{
		super(props);
        console.log("inside edit ");
        this.state = {
        	email : localStorage.getItem('email'),
        	username: "",
        	sex:"",
        	about:"",
        	imagename:"",
        	postedimage:"",
        	preview:"",
        	showedittab:false 
        }

		this.updateState = this.updateState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleDrop = this.handleDrop.bind(this);
	    this.showedit = this.showedit.bind(this);
	}

    componentWillMount()
    {   //console.log("this state of wiil mount",this.state)
       fetch("http://localhost:8080/user/finduser", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
        	"Accept":"application/json",
        	"Content-type": "application/json"
        }
        })
       .then((response) => { console.log('Success:');       	  
       	                     return response.json();     
       	                   }) 
       .catch(error => console.error('Error: of upload post', error))
       .then(response => {//console.log(response)
                          this.setState({
                          username: response[0].username,
                          sex:response[0].sex,
        	              about:response[0].about,
        	              imagename:response[0].imagename
                          })
                          //console.log("this state",this.state);    
                      })  
    }

    showedit(){
      if(this.state.showedittab===false){
        console.log("a");
        this.setState({showedittab:true})
      }
      else{ 
        console.log("b");
        this.setState({showedittab:false})
      }  
    }

	updateState(event)
    {   console.log("iniside updateState");
    	this.setState({
    	 [event.target.name] : event.target.value
    	});  
    }	

    handleDrop(accptedFiles)
    {  
    	//console.log(accptedFiles[0]);
    	this.setState({imagename:accptedFiles[0].name})
    	this.setState({postedimage:accptedFiles[0]})
    	//console.log(accptedFiles[0].preview);
    	this.setState({preview:accptedFiles[0].preview});
    } 


    handleSubmit(event)
    {  
       event.preventDefault();
       let formData = new FormData(); 	
       //console.log("iniside handlesubmit");
       formData.append("email",this.state.email);
       formData.append("about",this.state.about);
       formData.append("image",this.state.postedimage);
       formData.append("imagename",this.state.imagename);
       formData.append("sex",this.state.sex);
       formData.append("username",this.state.username);
       //console.log("formData",formData); 
       fetch("http://localhost:8080/user/upload", {
        method: "POST",
        body: formData,
        })
       .then((response) => { //console.log('Success:', response.ok);       	                    
       	                     this.showedit()
       	                     return response.json();     
       	                   }) 
       .catch(error => console.error('Error: of upload post', error))
       .then(response => {//console.log(response)
                          this.setState({
                          username: response[0].username,
                          sex:response[0].sex,
        	              about:response[0].about,
        	              imagename:response[0].imagename
                          })    
                      })
    }


	render(){
		return(
                <div>
                <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
                <link href="/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" /> 
                
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
          <img src={`http://localhost:8080/${this.state.imagename}`} style={{height:160}}/>
                      
                    </div>
                    <div className="profile_info">
                      <div onClick = {this.showedit}><div className="edit_div"><a> Edit <img src="/images/timeline_img.png" /></a></div></div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">{this.state.username}</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">{this.state.sex}</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">{this.state.about}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li><a className="active">Timeline    </a></li>
                      <li><a>About  </a></li>
                      <li><a>Album</a></li>
                      <li><a> Pets</a></li>
                      <li><a>My Uploads </a></li>
                    </ul>
                  </div>
                </div>
              
               {this.state.showedittab===true?  
                <div className="container">
                <div className="div_a">           
                <h3> Enter new Detals </h3>
                 <form method="post" enctype="multipart/form-data">
                     <h4> upload Picture </h4>
                     <Dropzone onDrop = {this.handleDrop}  >
                     
                     {this.state.preview===""?<p>click here to Upload new profile Picture</p>:<img src = {this.state.preview} alt="this is image" style={{height:200,width:200}} />}
                     </Dropzone>
                     
                     <h4> Username </h4>
                     <input type="text" name="username" placeholder="username.."  onChange={ e => this.updateState( e, 'username')} /><br/>
                     <h4> About Yourself </h4>
                     <input type="text" name="about" placeholder="about yourself.."  onChange={ e => this.updateState( e, 'about')}/><br/>
                     <h4> Sex </h4>
                     <select name="sex" onChange = { e => this.updateState( e, 'sex')}>
                       <option value="female">Female</option>
                       <option value="male">Male</option>

                     </select ><br/><br/>
               
                     <button type = "Submit" onClick = {this.handleSubmit} > Post</button>
               </form>
              </div>
             </div> :""}
         </div>   
               
			);
	}
}


export default Edit;