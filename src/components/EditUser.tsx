import * as React from "react";
import { useHistory } from "react-router";
import { Button, Container, TextField } from "@material-ui/core";
import { api, EditUserDTO, UpdateUserResponse } from "../services";
import { useCurrentUserContext } from "../services";

/** Initializing state with the skeleton of a user object */
const EMPTY_USER = {
  id: 0,
  first_name: "",
  location: "",
  bio: "",
  username: "",
};

// TODO Make sure Empty User is working as I'd expect
// ? Does it make sense to pass this as a prop to gaurantee existence?

export const EditUser: React.FC = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const [fields, setFields] = React.useState<EditUserDTO>(EMPTY_USER);
  const history = useHistory();

  /** Bail if user is not in context. */
  if (!currentUser) {
    console.error("Unable to retrieve user from state");
    history.push("/");
  }

  const { username, first_name, bio, location } = fields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    api.users.editUser(fields).then((data: UpdateUserResponse) => {
      if (data.status === 200) {
        setCurrentUser(data.user);
        history.push(`/users/${data.user.username}`);
        return;
      }
      console.warn("Unable to update user. Error:::", data);
    });
  };

  return (
    <Container>
      <TextField
        label="Username"
        name="username"
        onChange={handleChange}
        value={username}
      />
      <TextField
        label="first_name"
        onChange={handleChange}
        value={first_name}
      />
      <TextField
        label="Location"
        name="location"
        onChange={handleChange}
        value={location}
      />
      <TextField label="Bio" onChange={handleChange} value={bio} />
      <Button onClick={(e) => handleSubmit(e)}>Update User</Button>
    </Container>
  );
};
