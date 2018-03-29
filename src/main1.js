import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'; 

import HeaderMain1 from './headermain1';
import Footer from './footer';
import Signup from './signup';
import Login from './login';
import Loginverify from './loginver';
import Forget from './forget';
import Reset from './reset';

class Forms extends Component {
  constructor(props){
    super(props);
   console.log("iniside Forms");
  }

  render() {
    return (
      <div>
      <HeaderMain1 />
      <Switch>
       <Route  path = '/forms/signup' component = {Signup} />
       <Route  exact path = '/forms/login' component = {Login} /> 
       <Route  path = '/forms/login/:_id' component = {Loginverify} />
       <Route  path = '/forms/forget' component = {Forget} / >
       <Route  path = '/forms/reset/:id' component = {Reset} />
       <Route exact path = '/' component = {Signup} />       
      </Switch>
       <Footer />
      </div>
    );
  }
}

export default Forms;
