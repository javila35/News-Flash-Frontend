import React, { Component } from 'react';
import { api } from '../services/api';


class SignUp extends Component {
    state = {
        errors: false,
        fields: {
            username: "",
            password: "",
            verifyPassword: ""
        }
    };

    handleChange = (e) => {
        const newFields = {...this.state.fields, [e.target.name]: e.target.value};
        this.setState({
            fields: newFields
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let userObject = {
            username: this.state.fields.username,
            password: this.state.fields.password
        };
        if (this.state.fields.password !== this.state.fields.verifyPassword) {
            alert("Passwords do not match. Please try again.")
        } else {
            api.auth.createUser(userObject).then(data=>console.log(data));
            alert("Account creation succesful. Log in with your new credentials.")
        }
    };

    render() {
        const {username, password, verifyPassword} = this.state.fields;
        return(
            <>
                <form className="sign-up-form" onSubmit={e => this.handleSubmit(e)}>
                <label>Username:</label>
                <input type="text" 
                    name="username" 
                    onChange={this.handleChange} 
                    placeholder="Username"
                    value={username}
                /><br/>
                <label>Password:</label>
                <input type="password"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Password"
                    value={password}
                /><br/>
                <label>Confirm Password:</label>
                <input type="password"
                    name="verifyPassword"
                    onChange={this.handleChange}
                    placeholder="Password"
                    value={verifyPassword}
                /><br/>
                <p>Password must be between 8-16 characters.</p>
                <input type="submit" value="Create Account!"/>
                </form>
            </>
        )
    }
};

export default SignUp;