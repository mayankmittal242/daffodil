import React from 'react';

class HeaderMain1 extends React.Component{
  render(){
    return(
      <div> 
         <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
              <a className="brand" >PPL</a>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="header_lft">
            <div className="logo"><a><img src="/images/logo.png" /></a></div>
            
          </div>
            <div className="header_rgt">
            <div className="flag_div"><img src="/images/flag.png" /></div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box"><a><span className="msg_count">100</span></a></div>
            </div>
        </div>
      </div>  
      );
    }
    } 

export default HeaderMain1;     