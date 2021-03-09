import * as React from "react";
import { useHistory } from "react-router";
import { api, AuthenticateUserParams } from "../services/";

/** Form state extends UserAuthDTO with password verify field */
type SignUpState = AuthenticateUserParams & {
    verifyPassword: string;
}

const initialFieldState: SignUpState = {
    username: "",
    password: "",
    verifyPassword: ""
}

export const SignUp: React.FC = (props) => {
    const [errors, setErrors] = React.useState<boolean>(false);
    const [fields, setFields] = React.useState<SignUpState>(initialFieldState);
    const { username, password, verifyPassword } = fields;

    const history = useHistory();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (fields.password !== fields.verifyPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        };

        api.auth.createUser(fields).then(data => {
            if (!data.errors) {
                localStorage.setItem("token", data.jwt);
                // props.setCurrentUser(data.user);
                history.push(`/users/${data.user.username}`);
            } else {
                alert(data.errors[0]);
            };
        });
    };

    return (
        <>
            {
                localStorage.getItem("token") ? history.push('/') :
                    <div id="sign-up-form">
                        <h3>Sign Up</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Username:</label>
                            <input type="text"
                                name="username"
                                onChange={handleChange}
                                placeholder="Username"
                                value={username}
                            /><br />
                            <label>Password:</label>
                            <input type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Password"
                                value={password}
                            /><br />
                            <label>Confirm Password:</label>
                            <input type="password"
                                name="verifyPassword"
                                onChange={handleChange}
                                placeholder="Password"
                                value={verifyPassword}
                            /><br />
                            <input type="submit" value="Create Account!" />
                        </form>
                    </div>
            }
        </>
    );
};