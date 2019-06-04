import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


import Signup from './components/User/signup';
import Login from './components/User/login';
import Nav from './components/nav';
import Home from './components/home';

import './App.scss';

import axios from 'axios';



class App extends Component {
  constructor() {
    super()
    
  }
    
	
 
    render() {
        return (
          <div className="App">
            <Nav />
            
            <Route path="/login" 
                component={Login}
            />
            <Route path="/signup"
                component={Signup}
            />
          </div>
        );
  }
  
}
  

export default App;