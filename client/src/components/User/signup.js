import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


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
        
        /* 
        
        REENABLE THIS WHEN ALMOST DONE - CHECK USER TESTS RIGHT AFTER!!!
        if (password.length < 7) {
            alert('password must be at least 8 characters in length');
            return;
        }
        
        */
        
        axios.post('/user/', {
			username: username,
			password: password
		})
        .then(response => {
				if (!response.data.error) {
					
                    /* add some kind of non-intrusive confirmation here */
                    
					this.setState( {redirectTo: '/login'} );
				} else {
					alert('username already exists'); //will never trigger??
				}
        })
        .catch(error => {
            //WHILE THE password length check above is commented out thsi will now trigger!
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
                <div>
                    <h1>Signup to create your shopping list</h1>
                    <form>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="create your username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="create your password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <small>Password must be at least 8 characters</small>
                            <label htmlFor="confirmPassword">Confirm password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="same as password field"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                            <div>
                                <button onClick={this.handleSubmit}>Sign up</button>
                            </div>
                        </div>
                    </form>
                </div>
            ); 
        }
    }
        
}

export default Signup;
