import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import {
  api,
  AuthenticateUserParams,
  AuthResponse,
  UserState,
} from "../services";

type LoginProps = {
  /** Login method */
  onAuth: React.Dispatch<React.SetStateAction<UserState>>;
};

/** Message to display on unsuccesful login */
type ErrorState = {
  message?: string;
  status?: 401;
};

/** Returns a log in form for AccountMenu */
export const Login: React.FC<LoginProps> = ({ onAuth }) => {
  const INITIAL_FIELDS_STATE: AuthenticateUserParams = {
    username: "",
    password: "",
  };
  const [fields, setFields] = React.useState<AuthenticateUserParams>(
    INITIAL_FIELDS_STATE
  );
  const [error, setError] = React.useState<ErrorState | null>(null);
  const isError = Boolean(error);

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
      if ("jwt" in data && "user" in data) {
        localStorage.setItem("token", data.jwt);
        onAuth(data.user);
      } else if ("message" in data) {
        setError(data);
      }
    });
  };

  const stopPropagationForTab = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.stopPropagation();
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      onKeyDown={stopPropagationForTab}
    >
      <MenuItem tabIndex={1}>
        <FormControl error={isError}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input name="username" onChange={handleChange} />
          {error?.message === "Could not find username." && (
            <FormHelperText>{error.message}</FormHelperText>
          )}
        </FormControl>
      </MenuItem>
      <MenuItem tabIndex={2}>
        <FormControl error={isError}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input name="password" type="password" onChange={handleChange} />
          {error?.message === "Incorrect password." && (
            <FormHelperText>{error.message}</FormHelperText>
          )}
        </FormControl>
      </MenuItem>
      <MenuItem tabIndex={3}>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Log In
        </Button>
      </MenuItem>
    </div>
  );
};
