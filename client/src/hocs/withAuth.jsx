import React from "react";
import { Route, Navigate } from "react-router-dom";

const withAuth = (Component) => {
  const Wrapper = (props) => {
    const isAuthenticated = props.currentUser.isAuthenticated;

    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }
    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAuth;
