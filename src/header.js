import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component{
   constructor(props){
    super(props);
    console.log("inside header");
    //console.log("thisprops",this.props.info);
    this.handleLogOut = this.handleLogOut.bind(this);
    
   }

   handleLogOut(){
    localStorage.removeItem('emailrem');
    localStorage.removeItem('email');
    this.props.info.history.push('/forms/login');
  }


  render(){
    return(
      <div> <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
              <a className="brand" >PPL</a>
              <div className="pro_info pull-right">
                <div className="pro_icn"><img src="/images/pic_small.png" /></div>
                <div className="pro_txt">Me<b className="caret" /></div>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <li><a tabIndex={-1}>My Profile</a></li>
                  <li><a tabIndex={-1}>Message Box</a></li>
                  <li><a tabIndex={-1}>Change Language</a></li>
                  <li className="divider" />
                  <li><a tabIndex={-1}>
                      <input type="text" placeholder="search" />
                    </a></li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active"> <a>Home</a> </li>
                  <li> <a>E-Coupons</a> </li>
                  <li> <a>E-Brands</a> </li>
                  <li> <a>Resuse Market</a> </li>
                  <li> <a>Lost and Found</a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="header_lft">
            <div className="logo"><a><img src="/images/logo.png" /></a></div>
            <div className="navigatn">
              <ul>
                <li><Link to = '/details/home'>Home</Link></li>
                <li><a> E-Coupons </a></li>
                <li><a>E-Brands </a></li>
                <li><a> Resuse Market </a></li>
                <li><a> Lost and Found</a></li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div"><img src="/images/flag.png" /></div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box"><a><span className="msg_count">100</span></a></div>
            <div className="pro_info pull-right">
                <div className="pro_icn"><img src="/images/pic_small.png" /></div>
                <div className="pro_txt">Me<b className="caret" /></div>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <li><a tabIndex={-1}>My Profile</a></li>
                  <li><a tabIndex={-1}>Message Box</a></li>
                  <li><a tabIndex={-1}><div onClick = {this.handleLogOut}>Log out</div></a></li>
                  <li className="divider" />             
                </ul>
              </div>
          </div>
        </div>
      </div>  
      );
    }
    } 

export default Header;     