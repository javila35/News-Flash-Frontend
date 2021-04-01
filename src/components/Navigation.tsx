import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  List,
  ListItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle, Menu, Search } from "@material-ui/icons";
import { Login } from "./Login";
import { UserState } from "../App";

type NavProps = {
  /** User being passed down from App level state */
  currentUser: UserState;
  /** Login and logout method */
  onAuth: React.Dispatch<React.SetStateAction<UserState>>;
};

/**
 * TODO
 * [ ] Refactor to MUI
 * [x] Refactor to FC
 * [x] Refactor to TS
 * [x] Type state and props
 * [x] Add isOpen state
 */
export const Navigation: React.FC<NavProps> = ({ currentUser, onAuth }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [
    accountMenuEl,
    setAccountAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);
  const history = useHistory();

  const handleAccountMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(e.currentTarget);
  };

  const renderNavMenu = () => {
    const token = localStorage.getItem("token");
    return (
      <>
        {token ? null : showLogin()}
        <List>
          <ListItem onClick={() => setOpen(!open)}>
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem onClick={() => setOpen(!open)}>
            <Link to="/top">Top US Articles</Link>
          </ListItem>
          <ListItem onClick={() => setOpen(!open)}>
            <Link to="/tech">Technology</Link>
          </ListItem>
          <ListItem onClick={() => setOpen(!open)}>
            <Link to="/health">Health</Link>
          </ListItem>
          <ListItem onClick={() => setOpen(!open)}>
            <Link to="/business">Business</Link>
          </ListItem>
          <ListItem onClick={() => setOpen(!open)}>
            <Link to="/sports">Sports</Link>
          </ListItem>
          <ListItem onClick={() => setOpen(!open)}>
            {token && currentUser?.username ? (
              <Link to={`/users/${currentUser.username}`}>My Account</Link>
            ) : (
              <Link to={"/sign-up"}>Sign Up</Link>
            )}
          </ListItem>
          <ListItem onClick={() => setOpen(!open)}>
            <Link to="/users/">Users</Link>
          </ListItem>
          {token ? (
            <ListItem onClick={() => setOpen(!open)}>
              <Link to="/" onClick={() => showLogout()}>
                Log Out
              </Link>
            </ListItem>
          ) : null}
        </List>
        <form onSubmit={(e) => search(e)}>
          <TextField
            type="text"
            size="small"
            label="Search"
            name="query"
            variant="outlined"
            inputRef={searchEl}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={() => setOpen(!open)}
          >
            Search Headlines
          </Button>
        </form>
      </>
    );
  };

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchEl && searchEl.current) {
      const query = searchEl.current.value;
      history.push(`/search/${query}`);
    }
  };

  const showLogin = () => {
    return <Login onAuth={onAuth} />;
  };

  const showLogout = () => {
    localStorage.removeItem("token");
    onAuth(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" aria-label="open drawer">
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap>
          Newsflash
        </Typography>
        <div>
          <Search />
          <InputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleAccountMenuOpen}
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
