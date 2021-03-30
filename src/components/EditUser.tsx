import * as React from "react";
import { useHistory } from "react-router";
import { Button, Container, TextField } from "@material-ui/core";
import { api, EditUserDTO, UpdateUserResponse, UserDTO } from "../services";
import { UserState } from "../App";

type EditUserProps = {
  /** Current user stored in state */
  currentUser: UserDTO;
  /** Method to set updated user in state */
  updateCurrentUser: React.Dispatch<React.SetStateAction<UserState>>;
};
/**
 * TODO
 * [x] Refactor to FC
 * [x] Refactor to TS
 * [x] Type state and props
 * [x] Refactor to MUI
 * [x] Solve async issue
 */
export const EditUser: React.FC<EditUserProps> = ({
  currentUser,
  updateCurrentUser,
}) => {
  const [fields, setFields] = React.useState<EditUserDTO>(currentUser);
  const history = useHistory();

  /** Bail if user prop isn't passed. */
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
        updateCurrentUser(data.user);
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
