import React, { Component } from 'react'
import { api } from '../services/api';

class Login extends Component {
    state = {
        error: false,
        fields: {
            username: '',
            password: ''
        }
    };

    handleChange = event => {
        const newFields = { ...this.state.fields, [event.target.name]: event.target.value };
        this.setState({ fields: newFields});
    };

    // ATTENTION!
    // Set user in State on Login.
    handleSubmit = event => {
        event.preventDefault();
        api.auth.login(this.state.fields).then(response => {
            if (response.errors) {
                this.setState({
                    error: response.error
                },
                () => alert(this.state.error))
            } else {
                localStorage.setItem("token", response.jwt);
                //set User in state.
            }
        });
    };

    render() {
        const { fields } = this.state;
        return(
            <div>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <label htmlFor="username" />
                    <input type="text" name="username" onChange={this.handleChange} value={fields.username}></input>
                    <label htmlFor="password" />
                    <input type="password" name="password" onChange={this.handleChange} value={fields.password}></input>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
       );
    }
}

export default Login;