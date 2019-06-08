import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from './components/User/signup';
import Login from './components/User/login';
import Nav from './components/Navigation/nav';
import Home from './components/Navigation/home';
import ItemList from './components/List/item-list';
import EditItem from './components/List/edit-item';
import CreateItem from './components/List/create-item';
import NotFound from './components/Navigation/not-found';

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
            <Switch>
                <Route exact path="/" render={() =>
                    <Home loggedIn={this.state.loggedIn} />}
                />
                <Route path="/login" render={() =>
                    <Login updateState={this.updateState} />}
                />
                <Route path="/signup" component={Signup} />
                <Route exact path="/list" render={() =>
                    <ItemList loggedIn={this.state.loggedIn} />}
                />
                <Route exact path="/edit/:id" component={EditItem} />
                <Route path="/create" component={CreateItem} />
                <Route component={NotFound} />
            </Switch>
          </div>
        );
  }
  
}
  

export default App;