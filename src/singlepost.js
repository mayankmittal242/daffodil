import React from 'react'
import Head from './header';
import Footer from './footer'; 
import ShowPost from './showpost' 
import ShowComment from './showcomment'
  
class SinglePost extends React.Component{
  constructor(props){
   super(props);
   console.log("iniside constructor",this.props.match.params)
   this.state = {data:'',
                 comment:'',
                 showcomment:[] 
                };
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleChange(e){
    //console.log("inisde hadle chanfe")
    this.setState({comment:e.target.value})
   }


   handleSubmit(){
  console.log("iniside handle submit")
    let data = {
      comment: this.state.comment,
      id: this.props.match.params.id
    };
    fetch("http://localhost:8080/comment/add", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Accept":"application/json",
          "Content-Type":"application/json"
        }
      })
     .then((response) => {console.log('Success:', response.ok)
                           return (response.json()) }) 
     .catch(error => console.error('Error:', error))
     .then(response => {console.log(response)
                        this.setState({showcomment:response[0].comment})
                      })
                          
    
   }

  componentWillMount()
  { console.log("iniside will mount of SinglePost")
    fetch("http://localhost:8080/post/getsinglepost", {
          method: "POST",
          body: JSON.stringify(this.props.match.params),
          headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
          }
       })
     .then((response) => {console.log('Success:', response.ok)
                           return (response.json()) }) 
     .catch(error => console.error('Error:', error))
     .then(response => {//console.log("response",response)
                        this.setState({data : response[0]})
                        this.setState({showcomment:this.state.data.comment})   
                       })
    }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Singal Post</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
            <div className="content_lft">
              {this.state.data?<ShowPost info = {this.state.data}/>:""  }
               {this.state.showcomment? this.state.showcomment.map(obj => <ShowComment info = {obj} />):""}
                <div className="cmnt_div">
                      <input type="text" placeholder = "enter comment here" className="cmnt_bx" onChange = {this.handleChange}/>
                      <input type="submit" className="sub_bttn" defaultValue="Submit Comment" onClick = {this.handleSubmit}/>
                </div>
                   
                <div className="view_div"><a href="#">View more</a></div>
              </div>
            
          
          <div className="clear" />
          
      </div>
    );
  }
};


export default SinglePost;