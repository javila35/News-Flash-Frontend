import * as React from "react";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

export const NavMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderNavMenu = () => {
    /** Material UI Menu component prefers an array, instead of a react fragment */
    return [
      <MenuItem key="root">
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </MenuItem>,
      <MenuItem key="top-articles">
        <Link to="/top">
          <Button>Top US Articles</Button>
        </Link>
      </MenuItem>,
      <MenuItem key="tech-articles">
        <Link to="/tech">
          <Button>Technology</Button>
        </Link>
      </MenuItem>,
      <MenuItem key="health-articles">
        <Link to="/health">
          <Button>Health</Button>
        </Link>
      </MenuItem>,
      <MenuItem key="business-articles">
        <Link to="/business">
          <Button>Business</Button>
        </Link>
      </MenuItem>,
      <MenuItem key="sports-articles">
        <Link to="/sports">
          <Button>Sports</Button>
        </Link>
      </MenuItem>,
      <MenuItem key="all-users">
        <Link to="/users/">
          <Button>All Users</Button>
        </Link>
      </MenuItem>,
    ];
  };

  return (
    <>
      <IconButton edge="start" aria-label="open drawer" onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderNavMenu()}
      </Menu>
    </>
  );
};
