import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './signup.scss';


class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: ''
		}
        
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

    handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
    
	handleSubmit(e) {
		e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        
        if (username === '' || password === '' || confirmPassword === '') {
            alert('please enter data into all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('passwords dont match');
            return;
        }
        
        if (password.length < 7) {
            alert('password must be at least 8 characters in length');
            return;
        }
        
        axios.post('/user/', {
			username: username,
			password: password
		})
        .then(response => {
				if (!response.data.error) {
                    /* add some kind of short and non-intrusive confirmation that login was successful here */
					this.setState( {redirectTo: '/login'} );
				} else {
					alert('username already exists'); 
				}
        })
        .catch(error => {
            alert('there is already a user with this username');
            
            this.setState({
                 username: '',
			     password: '',
			     confirmPassword: ''
            });
        })
    }
	
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="signup">
                    <h2 className="signup__heading form-heading">Signup to create your shopping list</h2>
                    <form className="signup__form">
                        <div className="signup__form-container">
                            <p className="signup__group form-group">
                                <label className="signup__label" htmlFor="username">Username:</label>
                                <input autoFocus
                                    className="signup__input"
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="create your username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </p>
                            <p className="signup__group form-group">
                                <label className="signup__label" htmlFor="password">Password:</label>
                                <input
                                    className="signup__input"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="create your password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <small className="signup__small">*Password must be at least 8 characters</small>
                            </p>
                            <p className="signup__group form-group">
                                <label className="signup__label" htmlFor="confirmPassword">Confirm password:</label>
                                <input
                                    className="signup__input"
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="same as password field"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                />
                            </p>
                            <div className="signup__button-container button-container">
                                <button className="signup__button" onClick={this.handleSubmit}>Sign up</button>
                            </div>
                        </div>
                    </form>
                </div>
            ); 
        }
    }
        
}

export default Signup;
