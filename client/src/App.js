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
    
        this.updateState = this.updateState.bind(this);
      
    }
    
    /* 
    fix for logout on refresh - look at local/sessionStorage for an alternate fix:
    
    https://stackoverflow.com/questions/48845057/keep-user-logged-in-on-refresh-using-local-storage-with-react
    
    https://stackoverflow.com/questions/53830022/passportjs-get-details-of-logged-in-user-on-page-refresh-in-react-app/53831128
    */
    componentDidMount() {
        axios.get('/user/').then(response => {
            if (response.data.user) {
            this.setState({
              loggedIn: true,
              username: response.data.user.username
            })
            } else {
                this.setState({
                  loggedIn: false,
                  username: null
                })
            }
        })
    }
    
    updateState(userObject) {
        this.setState(userObject);
    }
    
    
    render() {
        return (
          <div className="App">
            <Nav updateUser={this.updateState} loggedIn={this.state.loggedIn} />
            {this.state.loggedIn &&
              <p>Hello {this.state.username}!</p>
            }
            <Route exact path="/" render={() =>
                <Home loggedIn={this.state.loggedIn} />}
            />
            <Route path="/login" render={() =>
                <Login updateState={this.updateState} />}
            />
            <Route path="/signup" component={Signup} />
          </div>
        );
  }
  
}
  

export default App;