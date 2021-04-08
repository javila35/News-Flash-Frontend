import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { CurrentUserProvider } from "./services";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
