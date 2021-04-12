import * as React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { AppBar } from "./AppBar";

const classes = {
  main: {
    margin: "1em auto",
  },
};

const useStyles = makeStyles(classes);

export const Layout: React.FC = ({ children }) => {
  const { main } = useStyles();
  return (
    <>
      <AppBar />
      <Container disableGutters className={main}>
        {/* Need to wrap the children in a React.Fragment to satisfy Material UI type */}
        <>{children}</>
      </Container>
    </>
  );
};
