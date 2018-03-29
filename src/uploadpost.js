import React from 'react';
import Dropzone from 'react-dropzone';


class UploadPost extends React.Component{
	constructor(props){
		super(props);
		console.log("inside UploadPost");
    this.state={
			uploadername : "",
			email : localStorage.getItem('email'),
			description : "",
			category : "",
			imagename : "",
			src: "",
			postedimage: "",
			preview:""
		}
    //  console.log("this.props",this.props.category)
 
		this.updateState = this.updateState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
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
       formData.append("description",this.state.description);
       formData.append("image",this.state.postedimage);
       formData.append("imagename",this.state.imagename);
       formData.append("category",this.state.category);
       //console.log("formData",formData); 
       fetch("http://localhost:8080/post/upload", {
        method: "POST",
        body: formData,
        })
       .then((response) => { console.log('Success:', response.ok);
       	                     this.props.display(); 
                             this.props.changepost();    
       	                   }) 
       .catch(error => console.error('Error: of upload post', error))
    }


	render(){
	 return(
         <div>
           <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
           <link href="/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" /> 
            <div className="container">
             <div className="div_a">           
               <h3> Create new Post </h3>
               <form method="post" encType="multipart/form-data">
                     <h4> upload Picture </h4>
                     <Dropzone onDrop = {this.handleDrop}  style={{width: 150,  height: 150, borderWidth: 2, borderColor: "rgb(102, 102, 102)", borderStyle: "dashed", borderRadius: 5}}>
                     
                     {this.state.preview ==""?<p>click here to UploadPost</p>:<img src = {this.state.preview} alt="this is image" style={{height:150,width:150}} />}
                     </Dropzone>
                     
                     <h4> Description </h4>
                     <textarea style={{height:150, width:180}} name="description" placeholder="Enter Description here...."  onChange={ e => this.updateState( e, 'description')}></textarea><br/>
                     <h4> Category </h4>
                     <select name="category" onChange = { e => this.updateState( e, 'category')}>
                       <option value="others">OTHERS</option>
                       {this.props.category.map(obj => <option value={obj.name}>{obj.name}</option>)}
                     </select ><br/><br/>
               
                     <button type = "Submit" onClick = {this.handleSubmit} > Post</button>
               </form>
              </div>
             </div> 
         </div>  
	 	);
  }
}
export default UploadPost; 