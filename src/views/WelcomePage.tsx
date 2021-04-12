import * as React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { GridColumn } from "../components";
import { useCurrentUserContext } from "../services";

const classes = {
  innerGrid: {
    paddingRight: "3em",
  },
  outerGrid: {
    justifyContent: "center",
  },
};

const useStyles = makeStyles(classes);

// TODO Refactor to MUI
export const WelcomePage: React.FC = () => {
  const { currentUser } = useCurrentUserContext();
  const { innerGrid, outerGrid } = useStyles();

  return (
    <Grid
      container
      alignContent="space-between"
      alignItems="stretch"
      className={outerGrid}
      lg={12}
      sm={4}
    >
      <Grid item lg={12}>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Welcome{currentUser ? ` ${currentUser.first_name}` : null}!
        </Typography>
      </Grid>
      <Grid item lg={4} className={innerGrid}>
        <GridColumn category="top articles" />
      </Grid>
      <Grid item lg={4} className={innerGrid}>
        <GridColumn category="health" />
      </Grid>
      <Grid item lg={4}>
        <GridColumn category="technology" />
      </Grid>
    </Grid>
  );
};
