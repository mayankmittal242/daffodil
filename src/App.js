import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'; 

import Forms from './main1';
import Details from './main2';

class App extends Component {
  render() {
    return (
      
      <Switch>

       <Route path = '/forms' component = {Forms} />
       <Route path = '/details' component = {Details} />
       <Route path = '/' component = {Forms} /> 
      </Switch>
    
    );
  }
}

export default App;
