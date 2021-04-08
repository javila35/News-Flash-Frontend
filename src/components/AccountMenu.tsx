import * as React from "react";
import { useHistory } from "react-router";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Login } from "./Login";
import { useUserContext } from "../services";

/** Account menu to display in AppBar */
export const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { currentUser, setCurrentUser, removeCurrentUser } = useUserContext()!;
  const token = localStorage.getItem("token");
  const history = useHistory();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleProfileClick = () => {
    history.push(`/users/${currentUser?.username}`);
  };

  const handleSignUpClick = () => {
    history.push("/sign-up");
  };

  /** Menu to display if a user is logged in */
  const renderAuthenticatedMenu = () => {
    /** Material UI Menu component prefers an array, instead of a react fragment */
    return [
      <MenuItem>
        <Button onClick={handleProfileClick}>My Profile</Button>
      </MenuItem>,
      <MenuItem>
        <Button onClick={removeCurrentUser}>Log Out</Button>
      </MenuItem>,
    ];
  };

  /** Menu to display if there is no logged in user */
  const renderLoginMenu = () => {
    /** Material UI Menu component prefers an array, instead of a react fragment */
    return [
      <Login onAuth={setCurrentUser} />,
      <MenuItem>
        <Button onClick={handleSignUpClick}>Sign Up</Button>
      </MenuItem>,
    ];
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {currentUser && token ? renderAuthenticatedMenu() : renderLoginMenu()}
      </Menu>
    </>
  );
};
