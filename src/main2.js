import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'; 
import Header from './header';
import Footer from './footer';

import Timeline from './timeline';
import UploadPost from './uploadpost';
import SinglePost from './singlepost';
import Home from './home';
import ContentRight from './contentright'

class Details extends Component {
  constructor(props)
  {
    super(props)
    console.log("inside Details");
    this.state={show:false} 
    this.updatepost = this.updatepost.bind(this)
  }
  
  updatepost(){
    this.state.show?this.setState({show:false}):this.setState({show:true}) 
  }

  render() {
    return (
      <div>
       <Header info = {this.props}/ >
        <div className="container">
         <div className="content">
         <ContentRight updatedpost = {this.updatepost}/>
         <Switch>
          <Route  path = '/details/uploadpost' component = {UploadPost} />
          <Route  path = '/details/timeline/:email' component = {Timeline} />
          <Route  path = '/details/singlepost/:id' component = {SinglePost} />
          <Route  path = '/details/home' render = {()=> (<Home show={this.state.show}/>)} />
         </Switch>
        </div> </div>
       <Footer / >
      </  div>

    );
  }
}

export default Details;
