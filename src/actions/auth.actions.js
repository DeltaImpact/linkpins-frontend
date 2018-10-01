import { userConstants } from "../constants";
import { authService } from "../services";

import { history } from "../helpers";

export const authActions = {
  login,
  register,
  logout,
};

function login(email, password) {
  return function(dispatch) {
    let user = {
      email: email,
      password: password
    };
    dispatch(loginUserRequest(user));
    return authService.login(email, password).then(
      user => {
        dispatch(loginUserSuccess(user));
        history.push("/");
      },
      error => {
        dispatch(loginUserFailure(error));
      }
    );
  };
}

export function loginUserRequest(user) {
  return {
    type: userConstants.LOGIN_USER_REQUEST,
    payload: {
      user
    }
  };
}

export function loginUserSuccess(user) {
  return {
    type: userConstants.LOGIN_USER_SUCCESS,
    payload: user
  };
}

export function loginUserFailure(error) {
  return {
    type: userConstants.LOGIN_USER_FAILURE,
    payload: error,
    error
  };
}

function register(email, username, password, firstName, surName) {
  return function(dispatch) {
    let user = {
      email: email,
      username: username,
      password: password
    };
    dispatch(registerUserRequest(user));
    return authService
      .register(email, username, password, firstName, surName)
      .then(
        user => {
          dispatch(registerUserSuccess(user));
          history.push("/");
        },
        error => {
          dispatch(registerUserFailure(error));
        }
      );
  };
}

export function registerUserRequest(user) {
  return {
    type: userConstants.REGISTER_USER_REQUEST,
    payload: {
      user
    }
  };
}

export function registerUserSuccess(token) {
  return {
    type: userConstants.REGISTER_USER_SUCCESS,
    payload: {
      token
    }
  };
}

export function registerUserFailure(error) {
  // localStorage.removeItem('token');
  return {
    type: userConstants.REGISTER_USER_FAILURE,
    payload: error,
    error
  };
}

function logout() {
  return dispatch => {
    dispatch(logoutUserExecution());
    authService.logout();
    // history.push('/');
  };
}

export function logoutUserExecution() {
  return {
    type: userConstants.LOGOUT_USER
  };
}