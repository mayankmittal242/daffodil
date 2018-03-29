import React from 'react';
import {Link} from 'react-router-dom';

import GetPost from './getpost';
import Edit from './edit';

class Timeline extends React.Component{

  constructor(props){
    super(props);
    console.log("this.props of timeline",this.props)  
      
  }
  
  componentWillMount()
  {  console.log("props of componentWillMount",this.props.match.params.email)
     localStorage.setItem('emailrem',this.props.match.params.email) 
     localStorage.setItem('email',this.props.match.params.email)
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends</li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged</li>
                  </ul>
                </div>
               </div> 
             
              <Edit />  
              <GetPost info = {this.props}/> 
               </div>
          
          <div className="clear" />     
      </div>

    );
  }
}

export default Timeline; 