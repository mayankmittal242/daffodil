import React from 'react';

class ShowComment extends React.Component{
   constructor(props){
   	super(props)
   	console.log("inside show comment constructor")
   }

  render(){
  	return(
            <div>
            <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
            <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
        
              <div className="contnt_3">
                  <ul>
                  <li>
                    <div className="list_image">
                      <div className="image_sec" ><img src="/images/post_img.png" /></div>
                      <div className="image_name"></div>
                    </div>
                    <div className="list_info">
                      {this.props.info}
                    </div>  
                  </li>
                 </ul>
                </div>                 
              </div>          
  		  )
    }
}

export default ShowComment