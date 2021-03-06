import React, { Component } from 'react';
import { api } from '../services/api';
import { Button, TextField } from '@material-ui/core';

/**
 * TODO
 * [ ] Refactor to FC
 * [ ] Refactor to TS
 * [ ] Type state and props
 */
export class Login extends Component {
    state = {
        error: false,
        fields: {
            username: "",
            password: ""
        }
    };

    handleChange = event => {
        const newFields = { ...this.state.fields, [event.target.name]: event.target.value };
        this.setState({ fields: newFields });
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
        return (
            <form onSubmit={event => this.handleSubmit(event)} >
                <TextField
                    label="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={fields.username}
                    variant="outlined"
                />
                <TextField
                    label="password"
                    name="password"
                    onChange={this.handleChange}
                    type="password"
                    value={fields.password}
                    variant="outlined"
                />
                <Button type="submit" value="Log In">Submit</Button>
            </form>
        );
    };
};