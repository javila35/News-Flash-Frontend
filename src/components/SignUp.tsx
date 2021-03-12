import * as React from "react";
import { useHistory } from "react-router";
import { UserState } from "../App";
import {
    api,
    AuthenticateUserParams,
    AuthResponse
} from "../services/";

/** Form state extends UserAuthDTO with password verify field */
type SignUpState = AuthenticateUserParams & {
    verifyPassword: string;
}

type SignUpProps = {
    /** Sets new user in state */
    setCurrentUser: React.Dispatch<React.SetStateAction<UserState>>;
}

const initialFieldState: SignUpState = {
    username: "",
    password: "",
    verifyPassword: ""
}

/** TODO: Add a toast saying success. */
export const SignUp: React.FC<SignUpProps> = ({ setCurrentUser }) => {
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

        /** Remove unused fields */
        const authParams = { username, password };

        console.log(authParams);

        api.auth.createUser(authParams).then((data: AuthResponse) => {
            if (data.status === 201) {
                console.log(data);
                setCurrentUser(data.user);
                localStorage.setItem("token", data.jwt);
                history.push("/");
                return;
            }
            console.warn("Sign up attemp failed. Eror:::", data);
            return;
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