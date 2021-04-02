import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
} from "@material-ui/core";
import { api, AuthenticateUserParams, AuthResponse } from "../services/";
import { UserState } from "../services";

type LoginProps = {
  /** Login method */
  onAuth: React.Dispatch<React.SetStateAction<UserState>>;
};

/**
 * TODO
 * Make the form tabbable
 * Add error messages for bad login
 */

/** Returns a log in form for AccountMenu */
export const Login: React.FC<LoginProps> = ({ onAuth }) => {
  const INITIAL_STATE: AuthenticateUserParams = { username: "", password: "" };
  const [fields, setFields] = React.useState<AuthenticateUserParams>(
    INITIAL_STATE
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFields: AuthenticateUserParams = {
      ...fields,
      [e.target.name]: e.target.value,
    };
    setFields(newFields);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.auth.login(fields).then((data: AuthResponse) => {
      if (data.status === 202) {
        localStorage.setItem("token", data.jwt);
        onAuth(data.user);
        return;
      }
      console.warn("Login attempt unsuccessful. Error:::", data);
      return;
    });
  };

  return (
    <>
      <MenuItem>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input name="username" onChange={handleChange} />
        </FormControl>
      </MenuItem>
      <MenuItem>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input name="password" onChange={handleChange} />
        </FormControl>
      </MenuItem>
      <MenuItem>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Log In
        </Button>
      </MenuItem>
    </>
  );
};
