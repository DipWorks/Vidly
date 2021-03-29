import React from "react";
import auth from "../../services/authService";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  // picking any additional properties along with the ones
  //that we need just in case they are supplied
  return (
    <Route
      {...rest}
      render={(props) => {
        // state object in the redirect component stores the original route the user
        // wanted to go which will be used to reroute the user back to after login
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            ></Redirect>
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
