import * as React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { ArticleTicker } from "./ArticleTicker";
import { useCurrentUserContext } from "../services";

const classes = {
  outerGrid: {
    justifyContent: "center",
  },
};

const useStyles = makeStyles(classes);

// TODO Refactor to MUI
export const WelcomePage: React.FC = () => {
  const { currentUser } = useCurrentUserContext();
  const { outerGrid } = useStyles();

  return (
    <Grid
      container
      alignContent="space-between"
      alignItems="stretch"
      className={outerGrid}
    >
      <Grid item lg={12}>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Welcome{currentUser ? ` ${currentUser.first_name}` : null}!
        </Typography>
      </Grid>
      <Grid container xs={3}>
        <ArticleTicker category="top articles" />
      </Grid>
      <Grid container xs={3}>
        <ArticleTicker category="health" />
      </Grid>
      <Grid container xs={3}>
        <ArticleTicker category="technology" />
      </Grid>
    </Grid>
  );
};
