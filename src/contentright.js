import React from 'react'	
import UploadCategories from './uploadcategories';
import UploadPost from './uploadpost';


class ContentRight extends React.Component{
	constructor(props){
		super(props);
	  this.state={
	  	show:false,
        showcat:false,
        updatedcat :[]  
      }  
    
      this.showcategories = this.showcategories.bind(this);
      this.showupdatedcat = this.showupdatedcat.bind(this);
      this.showuploadpost = this.showuploadpost.bind(this);
	}

    
   showuploadpost(){
     if(this.state.show===false){
        this.setState({show:true})
      }
      else{ 
        this.setState({show:false})
      }
   } 

    showcategories(){
    //console.log("inside showcategories");
     if(this.state.showcat===false){
        this.setState({showcat:true})
      }
      else{ 
        this.setState({showcat:false})
      }
   }

    showupdatedcat(e){
      this.setState({updatedcat:e})
      } 

     componentWillMount(){
     	fetch("http://localhost:8080/category/findcategory", {
        method: "POST",
        headers: {
        	"Accept":"application/json",
        	"Content-type": "application/json"
        }
        })
       .then((response) => { //console.log('Success:', response.ok);       	  
       	                     return response.json();     
       	                   }) 
       .catch(error => console.error('Error: of upload post', error))
       .then(responsee => {//console.log("response",responsee)
                          this.setState({updatedcat:responsee})
                          //console.log("updatedcat",this.state.updatedcat)
                         })       
     } 

    render(){
       return(
       	<div>

        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
    	<div className="content_rgt">
              <div onClick = {this.showuploadpost}><div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div></div>
              
              {(this.state.show===true)?<UploadPost display = {this.showuploadpost} changepost = {this.props.updatedpost} category={this.state.updatedcat}/>:""}
          
              <div onClick = {this.showcategories}><div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Add categories</a> </div></div>
              {this.state.showcat===true?<UploadCategories display = {this.showcategories} updatedcat = {this.showupdatedcat}/> :""}
              
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                   {this.state.updatedcat.map(obj => 
                    <li><a href="#"><span className="list_icon"><img src={`http://localhost:8080/${obj.imagename}`} alt="up" /></span>{obj.name}</a></li>)}
	                   </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="/images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="/images/feat_img2.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="/images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
       </div>
    )        
    }
}

export default ContentRight;