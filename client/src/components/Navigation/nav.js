import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import '../../App.scss';
import './nav.scss';
import axios from 'axios';


class Nav extends Component {
    constructor() {
        super();
		
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault()
 
        axios.post('/user/logout')
            .then(response => {
                if (response.status === 200) {
                    this.props.updateUser({
                        loggedIn: false,
                        username: null
                    });
                    
                    this.props.history.push('/');
                }
        }).catch(err => {
            console.log(err)
        })
      }
	
    render() {
        return (
                <header className="header">
                    {this.props.loggedIn ? (
                        <nav className="header__nav">
                            <ul className="header__list">
                                <li className="header__item">
                                    <NavLink className="header__link" to="/" activeClassName="is-active" exact={true}>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="header__item">
                                    <NavLink className="header__link" to="/list" activeClassName="is-active">
                                        Grocery List
                                    </NavLink>
                                </li>
                                <li className="header__item">
                                    <NavLink className="header__link" to="/create" activeClassName="is-active">
                                        Create Item
                                    </NavLink>
                                </li>
                                <li className="header__item">
                                    <NavLink className="header__link" to="#" onClick={this.logout}>
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    ) : (
                        <nav className="header__nav">
                            <ul className="header__list">
                                <li className="header__item">
                                    <NavLink className="header__link" to="/" activeClassName="is-active" exact={true}>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="header__item header__item-title">The Grocery List</li>
                                <li className="header__item">
                                    <NavLink className="header__link" to="/login" activeClassName="is-active">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="header__item">
                                    <NavLink className="header__link" to="/signup" activeClassName="is-active">
                                        Signup
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        )}
                </header>
        );

    }
}


export default withRouter(Nav);