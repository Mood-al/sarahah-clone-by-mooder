import React, { useContext } from "react";
// import { useEffect } from "react";
// import { useState } from "react";
import { Redirect, Route } from "react-router-dom";
// import { auth } from "../firebase/config";
import { AppContext } from "../context";
function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/messages", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
