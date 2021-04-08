import * as React from "react";
import {
  AppBar as MuiAppBar,
  InputAdornment,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useHistory } from "react-router";
import { NavMenu } from "./NavMenu";
import { AccountMenu } from "./AccountMenu";

const classes = {
  title: {
    flexGrow: 1,
  },
};

const useStyles = makeStyles(classes);

export const AppBar: React.FC = () => {
  const searchEl = React.useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { title } = useStyles();

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchEl?.current) {
      const query = searchEl.current.value;
      history.push(`/search/${query}`);
    }
  };

  /** Navigation menu in header */
  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <NavMenu />
        <Typography variant="h5" className={title}>
          Newsflash
        </Typography>
        <TextField
          inputRef={searchEl}
          onKeyDown={onSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          placeholder="Search..."
        />
        <AccountMenu />
      </Toolbar>
    </MuiAppBar>
  );
};
