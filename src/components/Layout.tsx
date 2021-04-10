import * as React from "react";
import { Container } from "@material-ui/core";
import { AppBar } from "./AppBar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <AppBar />
      <Container disableGutters>
          {/* Need to wrap the children in a React.Fragment to satisfy Material UI type */}
        <>{children}</>
      </Container>
    </>
  );
};
