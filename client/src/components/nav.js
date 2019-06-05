import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

import '../App.scss';
import axios from 'axios';


class Nav extends Component {
    constructor() {
        super()
		
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault()
 
        axios.post('/user/logout').then(response => {
          if (response.status === 200) {
              
              console.log(response);
              
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(err => {
            console.log(err)
        })
      }
	
    render() {
        const loggedIn = this.props.loggedIn;
        
        return (
            <div>
                <header>
                    <div>
                        {loggedIn ? (
                            <section>
                                    <Link to="#" onClick={this.logout}>
                                    <span>LOGOUT</span>
                                </Link>
                                <Link to="/list">
                                    <span>TODOS</span>
                                </Link>

                            </section>
                        ) : (
                            <section>
                                <Link to="/">
                                    <span>HOME</span>
                                </Link>
                                <Link to="/login">
                                    <span>LOGIN</span>
                                </Link>
                                <Link to="/signup">
                                    <span>SIGNUP</span>
                                </Link>
                            </section>
                            )}
                    </div>
                    <div>
                        <h1>Sign up</h1>
                    </div>
                </header>
            </div>

        );

    }
}

export default Nav;