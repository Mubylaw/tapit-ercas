import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
  console.log("setting user", user);
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return (dispatch) => {
    // const portfolio = localStorage.getItem("portfolio");
    // if (!portfolio || Date.now() - parseInt(portfolio, 10) > 3600 * 1000) {
    //   localStorage.clear();
    // } else {
    //   localStorage.removeItem("jwtToken");
    // }
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function authUser(type, userData, auto) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (auto) {
      } else {
        return apiCall("post", `/api/v1/auth/${type}`, userData)
          .then(({ token, user }) => {
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(user));
            dispatch(removeError());
            resolve();
          })
          .catch((err) => {
            dispatch(addError(err));
            reject();
          });
      }
    });
  };
}

export function forgotPassword(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall("POST", `/api/v1/auth/forgotpassword`, data)
        .then(() => {
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err));
          reject();
        });
    });
  };
}

export function resetPassword(token, data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall("PUT", `/api/v1/auth/resetpassword/${token}`, data)
        .then(({ token, user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err));
          reject();
        });
    });
  };
}

export function updateUserFn(id, data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall("PUT", `/api/v1/users/${id}`, data)
        .then(({ token, user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err));
          reject();
        });
    });
  };
}

export function getUserFn(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall("GET", `/api/v1/users/${id}`)
        .then(({ token, data }) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(data));
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err));
          reject();
        });
    });
  };
}
