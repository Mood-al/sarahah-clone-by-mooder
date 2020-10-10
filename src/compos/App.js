import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import Error from "../pages/Error";
import SignIn from "../pages/SignIn";
import Messages from "../pages/Messages";
import Message from "../pages/Message";
import NavBar from "./NavBar";
import "./App.css";

import PrivateRoute from "./PrivateRoute";
import Modal from "./Modal";
import { useContext } from "react";
import { AppContext } from "../context";

const App = () => {
  const { modal } = useContext(AppContext);
  return (
    <>
      <NavBar />
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/signup" component={SignUp} />

          <Route path="/signin" component={SignIn} />

          <Route path="/about" component={About} />
          <PrivateRoute exact path="/messages" component={Messages} />

          <Route path="/messages/:id" component={Message} />

          <Route component={Error} />
        </Switch>
      </div>
      {modal && <Modal />}
    </>
  );
};

export default App;
