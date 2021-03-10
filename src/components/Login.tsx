import * as React from 'react';
import { Button, TextField } from '@material-ui/core';
import { api, AuthenticateUserParams, UserDTO } from '../services/';
import { UserState } from '../App';

type LoginProps = {
    /** Login method */
    onAuth: React.Dispatch<React.SetStateAction<UserState>>;
}

interface AuthSessionResponse extends UserDTO {
    jwt: string;
}

/**
 * TODO
 * [x] Refactor to FC
 * [x] Refactor to TS
 * [x] Type state and props
 */

export const Login: React.FC<LoginProps> = ({ onAuth }) => {
    const INITIAL_STATE: AuthenticateUserParams = { username: "", password: "" };
    const [fields, setFields] = React.useState<AuthenticateUserParams>(INITIAL_STATE);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFields: AuthenticateUserParams = { ...fields, [e.target.name]: e.target.value };
        setFields(newFields);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        /** TODO: Add React-Query to deal with login logic */
        api.auth.login(fields)
            .then((data: AuthSessionResponse) => {
                localStorage.setItem("token", data.jwt);
                onAuth(data)
            });
    }

    return (
        <>
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
            <Button type="submit" value="Log In" onClick={e => handleSubmit(e)}>Submit</Button>
        </>
    );
}