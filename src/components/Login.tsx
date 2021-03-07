import * as React from 'react';
import { api, UserAuthDTO } from '../services/api';
import { Button, FormControl, TextField } from '@material-ui/core';

/**
 * TODO
 * [x] Refactor to FC
 * [x] Refactor to TS
 * [x] Type state and props
 */

export const Login: React.FC = () => {
    const INITIAL_STATE: UserAuthDTO = { username: "", password: "" };
    const [fields, setFields] = React.useState<UserAuthDTO>(INITIAL_STATE);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFields: UserAuthDTO = { ...fields, [e.target.name]: e.target.value };
        setFields(newFields);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        /** TODO: Add React-Query to deal with login logic */
        // api.auth.login(fields)

        /** TODO: set token in local storage */
        // localStorage.setItem("token", response.jwt)

        /** TODO: Set User in State
         * Pass down callback to affect top level state
         * Context??
         */
        // props.setCurrentUser(data.user)
    }

    return (
        <FormControl onSubmit={e => handleSubmit(e)}>
            <TextField
                label="Username"
                name="username"
                onChange={handleChange}
                value={fields.username}
                variant="outlined"
            />
            <TextField
                label="Password"
                name="password"
                onChange={handleChange}
                type="password"
                value={fields.password}
                variant="outlined"
            />
            <Button type="submit" value="Log In">Submit</Button>
        </FormControl>
    );
}