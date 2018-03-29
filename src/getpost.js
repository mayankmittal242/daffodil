import React from 'react';
import {Link} from 'react-router-dom';
import ShowPost from './showpost'


class GetPost extends React.Component{
	constructor(props){
		super(props);
	     
    this.state={
			uploadername : "",
			email : localStorage.getItem('email'),
			description : "",
			category : "",
			imagename : "",
			date :"",
			data : []
		}
    this.getPosts = this.getPosts.bind(this);
   }

    
      getPosts(){
        //console.log("inside wiil mount")
         let data = {"email" : this.state.email}
         //console.log(data) 
         let info =  {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
        }
        //console.log("hi",hi)
        fetch("http://localhost:8080/post/getpost",info)
        .then((response) => {//console.log('Success:', response.ok);
                             return response.json();}) 
        .catch(error => console.error('Error:', error))
        .then(response => {if(response !== null)
                            response.reverse();
                           this.setState({data : response});
                           //console.log("data",this.state.data)  
                          })
      }
    componentWillMount()
    { 
      this.getPosts();  
    }

    componentWillReceiveProps(nextProps){
      //console.log("i am in will React porop...! ")
      this.getPosts();
    }

    render(){
        return(  
       		    <div>
           	        <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
                    <link href="/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
                    {this.state.data.map(obj => <ShowPost info = {obj} /> )}
                    </div>
        		  )
               } 
}

export default GetPost;