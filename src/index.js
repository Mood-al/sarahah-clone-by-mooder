import React from "react";
import ReactDOM from "react-dom";

import App from "./compos/App";
import { AppProvider } from "./context";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <AppProvider>
    <Router>
      <App />
    </Router>
  </AppProvider>,
  document.querySelector("#root")
);
