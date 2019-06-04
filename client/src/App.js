import React, { Component } from 'react';


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
    
	componentDidMount() {
        axios.get('/test/')
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
 
    render() {
        return (
          <div className="App">
            <Nav />
            <Home />
            <Signup />
            <Login />
          </div>
        );
  }
  
}
  

export default App;