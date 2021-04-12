import * as React from "react";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Input,
  Typography,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import {
  api,
  AccountCreationResponse,
  AccountCreationError,
  AuthenticateUserParams,
  UserState,
} from "../services/";

/** Form state extends UserAuthDTO with password verify field */
type SignUpState = AuthenticateUserParams & {
  verifyPassword: string;
};

type SignUpProps = {
  /** Sets new user in state */
  setCurrentUser: React.Dispatch<React.SetStateAction<UserState>>;
};

type ErrorState = {
  message: AccountCreationError;
  status?: 401 | 201;
};

const initialFieldState: SignUpState = {
  username: "",
  password: "",
  verifyPassword: "",
};

const classes = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
  },
  formControl: {
    width: "50%",
    marginBottom: "1em",
  },
};

const useStyles = makeStyles(classes);

// TODO: Add a toast saying success to welcome page
export const SignUp: React.FC<SignUpProps> = ({ setCurrentUser }) => {
  const [fields, setFields] = React.useState<SignUpState>(initialFieldState);
  const [error, setError] = React.useState<null | ErrorState>(null);
  const isError = Boolean(error);
  const { username, password, verifyPassword } = fields;
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { container, formControl } = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (fields.password !== fields.verifyPassword) {
      setError({ message: "Passwords do not match." });
      return;
    }

    /** Remove unused fields */
    const authParams = { username, password };

    // ! FIX: This isn't pushing user to state or history
    // ! if in method probably isn't working
    api.auth.createUser(authParams).then((data: AccountCreationResponse) => {
      if ("user" in data && "jwt" in data) {
        setCurrentUser(data.user);
        localStorage.setItem("token", data.jwt);
        history.push("/");
      } else {
        setError(data);
      }
    });
  };

  const renderLoggedInError = () => {
    return (
      <Typography variant="h4">
        It seems like you're already logged in.
      </Typography>
    );
  };

  const renderSignUpForm = () => {
    return (
      <Container className={container}>
        <Typography variant="h3">Sign Up</Typography>
        <FormControl className={formControl} error={isError}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input name="username" onChange={handleChange} value={username} />
          {error?.message === "Username has already been taken" && (
            <FormHelperText>{`${error.message}.`}</FormHelperText>
          )}
        </FormControl>
        <FormControl className={formControl} error={isError}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            onChange={handleChange}
            value={password}
            type="password"
          />
        </FormControl>
        <FormControl className={formControl} error={isError}>
          <InputLabel htmlFor="verifyPassword">Verify Password</InputLabel>
          <Input
            name="verifyPassword"
            onChange={handleChange}
            placeholder="Verify password"
            value={verifyPassword}
            type="password"
          />
          {error?.message === "Passwords do not match." && (
            <FormHelperText>{error.message}</FormHelperText>
          )}
        </FormControl>
        <Button onClick={handleSubmit}>Create Account</Button>
      </Container>
    );
  };

  return <>{token ? renderLoggedInError() : renderSignUpForm()}</>;
};
