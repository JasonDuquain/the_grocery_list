import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './login.scss';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.setState( {[e.target.name]: e.target.value} );
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.state.username === '' || this.state.password === '') {
            alert('please enter data into all fields');
            return;
        }
        
        axios.post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                if (response.status === 200) {
                    this.props.updateState({
                        loggedIn: true,
                        username: response.data.username
                    })
                    /** 20190608 - changed redirectTo path from '/' to '/create'.../ was taking to home page which was sending directly to the <CreateTodo> component and was NOT USING ROUTING so it was not getting the username prop || Also look into changing this programatically (this.props.push('/create)) **/
                    this.setState( {redirectTo: '/create'} )
                }
            }).catch(error => {
                alert('login failed - try again');
            
                this.setState({
                     username: '',
                     password: ''
                });
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="login">
                    <h2 className="login__heading form-heading">Login Form</h2>
                    <form className="login__form">
                        <div className="login__form-container">
                           <p className="login__group form-group">
                            <label className="login__label" htmlFor="username">Username</label>
                            <input autoFocus
                                className="login__input"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="enter username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                           </p>
                            <p className="login__group form-group">
                                <label className="login__label" htmlFor="password">Password: </label>
                                <input
                                    className="login__input"
                                    placeholder="enter password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </p>
                            <div className="login__button-container button-container">
                                <button className="login__button"    
                                    onClick={this.handleSubmit}
                                    type="submit">Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
}


export default Login;
