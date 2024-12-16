import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "./Hompage";
import AuthForm from "../components/AuthForm";
import { authUser, forgotPassword, resetPassword } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import Dashboard from "./Dashboard";
import Signup from "../components/Signup";
import Landing from "./Landing";
import Demo from "./Demo";
import Pos from "./Pos";
import Online from "./Online";
import Success from "./Success";
import Failed from "./Failed";

const Main = (props) => {
  const {
    authUser,
    errors,
    removeError,
    currentUser,
    forgotPassword,
    resetPassword,
  } = props;
  return (
    <div className="container">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Homepage
              currentUser={currentUser}
              removeError={removeError}
              Page={Dashboard}
              position="one"
              {...props}
            />
          }
        />
        <Route
          exact
          path="/dash"
          element={
            <Dashboard
              currentUser={currentUser}
              removeError={removeError}
              position="one"
              {...props}
            />
          }
        />
        <Route
          exact
          path="/landing"
          element={
            <Landing
              currentUser={currentUser}
              removeError={removeError}
              position="one"
              {...props}
            />
          }
        />
        <Route
          exact
          path="/demo"
          element={
            <Demo
              currentUser={currentUser}
              removeError={removeError}
              position="one"
              {...props}
            />
          }
        />
        <Route
          exact
          path="/pos"
          element={
            <Pos
              currentUser={currentUser}
              removeError={removeError}
              position="one"
              {...props}
            />
          }
        />
        <Route
          exact
          path="/onlinepayment"
          element={
            <Online
              currentUser={currentUser}
              removeError={removeError}
              position="one"
              {...props}
            />
          }
        />
        <Route
          exact
          path="/success"
          element={
            <Success
              currentUser={currentUser}
              removeError={removeError}
              position="one"
              {...props}
            />
          }
        />
        <Route
          exact
          path="/failed"
          element={
            <Failed
              currentUser={currentUser}
              removeError={removeError}
              position="one"
              {...props}
            />
          }
        />

        <Route
          exact
          path="/signin"
          element={
            <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              forgot={forgotPassword}
              {...props}
            />
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <Signup
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              forgot={forgotPassword}
              {...props}
            />
          }
        />

        <Route
          exact
          path="/resetpassword"
          element={
            <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              resetPass={resetPassword}
              reset
              buttonText="Reset"
              heading="Reset your password"
              {...props}
            />
          }
        />

        <Route
          path="*"
          element={
            <Homepage
              currentUser={currentUser}
              removeError={removeError}
              Page={Dashboard}
              position="one"
              {...props}
            />
          }
        />
      </Routes>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, {
  authUser,
  removeError,
  forgotPassword,
  resetPassword,
})(Main);
