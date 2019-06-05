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
        super();
        this.state = {
            loggedIn: false,
            username: null
        }
    
        this.updateUser = this.updateUser.bind(this);
      
    }
    
    updateUser(userObject) {
        this.setState(userObject);
    }
    
    
    render() {
        return (
          <div className="App">
            <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
            {this.state.loggedIn &&
              <p>Hello {this.state.username}!</p>
            }
            <Route exact path="/" render={() =>
                <Home loggedIn={this.state.loggedIn} />}
            />
            <Route path="/login" render={() =>
                <Login updateUser={this.updateUser} />}
            />
            <Route path="/signup" component={Signup} />
          </div>
        );
  }
  
}
  

export default App;