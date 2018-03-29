import React from 'react';
import {Link} from 'react-router-dom'
class ShowPost extends React.Component{
   constructor(props){
   	super(props);
   	//console.log("this.props of show post",this.props)

    this.state = { like:0,
                    id: "",
                    likenum:0
                }	
    
   this.Datefind = this.Datefind.bind(this);
   this.Timefind = this.Timefind.bind(this);   
   this.changelike = this.changelike.bind(this);
  }

   changelike()
   {
   	let flag;
   	//console.log("inside changelike");
   	if(this.state.like === 0)
   		{
   		  this.setState({likenum:this.state.likenum+1})	
   		  this.setState({like:1});
   	      flag=1;
   	    } 
   	else
        {
         this.setState({likenum:this.state.likenum-1}) 
         this.setState({like:0})
         flag=-1;
        }

       let data = {
       	"email": this.props.info.email  ,
       	"val": flag,
       	"id": this.props.info._id	  
       } 
      
      fetch("http://localhost:8080/post/likechange", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
          }
       })
     .then((response) => {console.log('Success:', response.ok)
                           }) 
     .catch(error => console.error('Error:', error))
     

   }

  Datefind(oldDate){
      let newDate = new Date(oldDate);
      let mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
      var date = newDate.getDate();
      var month = newDate.getMonth(); //Be careful! January is 0 not 1
      var year = newDate.getFullYear();
      return date+" "+mon[month]+" "+year;  
    } 

    Timefind(oldTime){
      let newTime = new Date(oldTime)
      let hours = newTime.getHours();
      let zone; 
      if(hours>12){hours-=12;zone="pm";}else{zone="am"};
      let min = newTime.getMinutes();
      return hours+":"+min+" "+zone;
    }
	
    componentWillMount()
    {
    	//console.log("iniside componentWillMount of showpost");
    	if(this.props.info.like.length===1)
    		this.setState({like:1})
      this.setState({likenum:this.props.info.like.length})
    }

	render(){
		return(
			  <div>
			    <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">{this.props.info.description}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{this.props.info.category}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="/images/img_6.png" />{this.props.info.uploadername}</div>
                    <div className="div_top_rgt"><span className="span_date">{this.Datefind(this.props.info.date)}</span><span className="span_time">{this.Timefind(this.props.info.date)}</span></div>
                  </div>
                  <Link to = {`/details/singlepost/${this.props.info._id}`}><div className="div_image"><img style={{height:350, width:500}} src={`http://localhost:8080/${this.props.info.imagename}`} alt="pet" /></div></Link>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <div onClick = {this.changelike}><li><a href="#"><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{this.state.likenum}{this.state.like===0?" Like":" dislike"}</a></li></div>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.props.info.comment.length} Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
               </div>
              </div>

			);
	}
} 

export default ShowPost;