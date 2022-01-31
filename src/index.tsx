import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AuthenticatedRouter from "./router/authenticatedRouter";

ReactDOM.render(
  <React.StrictMode>
    <AuthenticatedRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
