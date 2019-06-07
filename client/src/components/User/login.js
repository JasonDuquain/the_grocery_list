import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


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
        e.preventDefault()

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
                    this.setState( {redirectTo: '/'} )
                }
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h1>Login Form</h1>
                    <form>
                        <div>
                            <div>
                                <label htmlFor="username">Username</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="enter username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="password">Password: </label>
                            </div>
                            <div>
                                <input
                                    placeholder="enter password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button    
                                onClick={this.handleSubmit}
                                type="submit">Login
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}


export default Login;
