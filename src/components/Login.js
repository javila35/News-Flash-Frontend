import React, { Component } from 'react';
import { api } from '../services/api';
import { connect } from 'react-redux';
import { getCurrentUser } from '../redux'

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

    handleSubmit = event => {
        event.preventDefault();
        api.auth.login(this.state.fields).then(response => {
            if (response.error) {
                this.setState({
                    error: response.error
                },
                () => alert(this.state.error))
            } else {
                localStorage.setItem("token", response.jwt);
                this.props.setCurrentUser(response.user);
            }
        });
    };

    render() {
        const { fields } = this.state;
        return(
            <div className="login-form">
                <form onSubmit={event => this.handleSubmit(event)} >
                    <label htmlFor="username" />
                    Username: <input type="text" name="username" onChange={this.handleChange} value={fields.username}></input>
                    <label htmlFor="password" />
                    Password: <input type="password" name="password" onChange={this.handleChange} value={fields.password}></input><br/>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
       );
    };
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: current_user => dispatch(getCurrentUser(current_user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);