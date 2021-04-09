import * as React from "react";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

type MenuOption = {
  /** URL for Link */
  link: string;
  /** Text to display in Link */
  name: string;
};

type MenuOptions = MenuOption[];

// TODO Allow user to pick thier own menu options
const menuItems: MenuOptions = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/top",
    name: "Top Articles",
  },
  {
    link: "/tech",
    name: "Technology",
  },
  {
    link: "/health",
    name: "Health",
  },
  {
    link: "/business",
    name: "Business",
  },
  {
    link: "/sports",
    name: "Sports",
  },
  {
    link: "/users",
    name: "All Users",
  },
];

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
    return menuItems.map((option: MenuOption, index) => {
      const { link, name } = option;
      return (
        <MenuItem key={index} onClick={handleClose}>
          <Link to={link}>
            <Button>{name}</Button>
          </Link>
        </MenuItem>
      );
    });
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
