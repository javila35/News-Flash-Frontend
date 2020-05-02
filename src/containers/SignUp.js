import React, { Component } from 'react';
import { api } from '../services/api';
import { connect } from 'react-redux';
import { getCurrentUser } from '../redux';


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
            user: {
                username: this.state.fields.username,
                password: this.state.fields.password
            }
        };
        if (this.state.fields.password !== this.state.fields.verifyPassword) {
            alert("Passwords do not match. Please try again.");
        } else {
            api.auth.createUser(userObject).then(data=>{
                if (!data.errors) {
                    localStorage.setItem("token", data.jwt);
                    this.props.setCurrentUser(data.user);
                    this.props.history.push(`/users/${data.user.username}`);
                } else {
                    alert(data.errors[0]);
                };
            });
        };
    };

    render() {
        const {username, password, verifyPassword} = this.state.fields;
        return(
            <div id="sign-up-form">
                <h3>Sign Up</h3>
                <form onSubmit={e => this.handleSubmit(e)}>
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
                <input type="submit" value="Create Account!"/>
                </form>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: current_user => dispatch(getCurrentUser(current_user))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);