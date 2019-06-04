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
    
    
    
    componentDidMount() {
        axios.get(/user/)
        .then(users => console.log(users))
        .catch(err => console.log(err))
    }
    
    
    
    handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
    
	handleSubmit(e) {
		e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const confirmPassord = this.state.confirmPassword;
        
        if (password !== confirmPassord) {
            alert('passwords dont match');
            return;
        }
        
        axios.post('/user/', {
			username: username,
			password: password
		})
        .then(response => {
            console.log(response);
				if (!response.data.error) {
					console.log('successful signup')
					this.setState( {redirectTo: '/login'} );
				} else {
					alert('username already exists');
				}
        })
        .catch(error => console.log('sign up svr err'))
    }
	
    render() {
        if (this.state.redirectTo) {
            <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h1>Signup to create your shopping list</h1>
                    <form>
                        <div>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="confirmPassword">Confirm password: </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                        <button onClick={this.handleSubmit}>Sign up</button>
                        </div>
                    </form>
                </div>
            ); 
        }
    }
        
}

export default Signup;
