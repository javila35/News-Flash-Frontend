import React from "react";
import { Typography } from "@material-ui/core";
import { ArticleTicker } from "./ArticleTicker";

/**
 * TODO
 * [ ] Refactor to FC
 * [ ] Refactor to TS
 * [ ] Type state and props
 */
export const WelcomePage = ({ currentUser }) => {
  return (
    <>
      <Typography variant="h3">
        Welcome{currentUser ? ` ${currentUser.first_name}` : null}!
      </Typography>
      <div id="ticker-div">
        <div className="ticker-box">
          <h3 className="ticker-title">Recent Headlines</h3>
          <ArticleTicker category="top articles" />
        </div>
        <div className="ticker-box">
          <h3 className="ticker-title">Health</h3>
          <ArticleTicker category="health" />
        </div>
        <div className="ticker-box">
          <h3 className="ticker-title">Technology</h3>
          <ArticleTicker category="technology" />
        </div>
      </div>
    </>
  );
};
