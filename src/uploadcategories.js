import React from 'react';
import Dropzone from 'react-dropzone';


export class UploadCategories extends React.Component{
	constructor(props){
		super(props);
		console.log("inside UploadCategories");
    this.state={
		
			name : "",
			imagename : "",
			postedimage: "",
			preview:""
		}

 
		this.updateState = this.updateState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
	}

	updateState(event)
    {   console.log("iniside updateState");
    	this.setState({
    	 name : event.target.value
    	});
      
    }	

    handleDrop(accptedFiles)
    {  
    	console.log(accptedFiles[0]);
    	this.setState({imagename:accptedFiles[0].name})
    	this.setState({postedimage:accptedFiles[0]})
    	this.setState({preview:accptedFiles[0].preview});
    } 


    handleSubmit(event)
    {  
       event.preventDefault();
       let formData = new FormData(); 	
       console.log("iniside handlesubmit");
       formData.append("name",this.state.name);
       formData.append("image",this.state.postedimage);
       formData.append("imagename",this.state.imagename)
       //console.log("formData",formData);  
    
        fetch("http://localhost:8080/category/upload", {
        method: "POST",
        body: formData,
        })
       .then((response) => { console.log('Success:', response.ok);
                             this.props.display();  
                             return response.json()                           
                           }) 
       .catch(error => console.error('Error: of upload post', error))
       .then(response => {this.props.updatedcat(response)
                          console.log(response)} ) 
    }
    


	render(){
	 return(
         <div>
           <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
           <link href="/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" /> 
            
             <div className="div_a">
              <div style={{width:300, borderWidth: 2, padding:5,borderColor: "rgb(102, 102, 102)", borderStyle: "solid", borderRadius: 5}}>           
               <form method="post" enctype="multipart/form-data">
                     <h4> Upload Picture </h4>
                     <Dropzone onDrop = {this.handleDrop} style={{width: 60,  height: 50, borderWidth: 2, borderColor: "rgb(102, 102, 102)", borderStyle: "dashed", borderRadius: 5}} >
                     
                     {this.state.preview ==""?<p>Click here</p>:<img src = {this. state.preview} alt="this is image" style={{height:60,width:50}} />}
                     </Dropzone>
                     
                     <h4> Name </h4>
                     <textarea style={{height:25, width:180}} name="description" placeholder="Enter Description here...."  onChange={this.updateState}> </textarea><br/>
                     <br /><button type = "Submit" onClick = {this.handleSubmit} > Submit</button>
               </form>
               </div>
          
             </div> 
         </div>  
	 	)}
}

export default UploadCategories;