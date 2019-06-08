import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../../App.scss';
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
        return (
            <div>
                <header>
                    <div>
                        {this.props.loggedIn ? (
                            <section>
                                <NavLink to="#" onClick={this.logout} style={{display: "inline-block", padding: "2em"}}>
                                    <span>LOGOUT</span>
                                </NavLink>
                                <NavLink to="/list" activeClassName="is-active">
                                    <span>GROCERY LIST</span>
                                </NavLink>
                                <NavLink to="/create" activeClassName="is-active">
                                    <span>CREATE ITEM</span>
                                </NavLink>
                            </section>
                        ) : (
                            <section>
                                <NavLink to="/" activeClassName="is-active" exact={true}>
                                    <span>HOME</span>
                                </NavLink>
                                <NavLink to="/login" activeClassName="is-active">
                                    <span>LOGIN</span>
                                </NavLink>
                                <NavLink to="/signup" activeClassName="is-active">
                                    <span>SIGNUP</span>
                                </NavLink>
                            </section>
                            )}
                    </div>
                </header>
            </div>

        );

    }
}


export default Nav;