import { userConstants } from "../constants";
import { userService } from "../services";

import { history } from "../helpers";

export const userActions = {
  login,
  register,
  logout,
  data_about_user
};

function login(email, password) {
  return function(dispatch) {
    let user = {
      email: email,
      password: password
    };
    dispatch(loginUserRequest(user));
    return userService.login(email, password).then(
      user => {
        
        dispatch(loginUserSuccess(user));
        history.push("/");
      },
      error => {
        
        dispatch(loginUserFailure(error));
        // dispatch(failure(error));
        // dispatch(alertActions.error(error));
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
  // localStorage.setItem('token', token);
  return {
    type: userConstants.LOGIN_USER_SUCCESS,
    payload: user
  };
}

export function loginUserFailure(error) {
  // localStorage.removeItem('token');
  return {
    type: userConstants.LOGIN_USER_FAILURE,
    payload: error,
    error
    // payload: {
    //     status: error.response.status,
    //     statusText: error.response.statusText,
    // },
  };
}

function register(email, username, password) {
  return function(dispatch) {
    let user = {
      email: email,
      username: username,
      password: password
    };
    dispatch(registerUserRequest(user));
    return userService.register(email, username, password).then(
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
  // localStorage.setItem('token', token);
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
    // payload: {
    //     status: error.response.status,
    //     statusText: error.response.statusText,
    // },
  };
}

function logout() {
  return dispatch => {
    dispatch(logoutUserExecution());
    userService.logout();
    // history.push('/');
  };
}

export function logoutUserExecution() {
  return {
    type: userConstants.LOGOUT_USER
  };
}

function data_about_user() {
  return dispatch => {
    dispatch(profileUserRequest());
    userService.data_about_user().then(
      user => {
        dispatch(profileUserSuccess(user));
        
      },
      error => {
        
        dispatch(profileUserFailure(error));
      }
    );
  };

  function profileUserRequest() {
    return {
      type: userConstants.PROFILE_USER_REQUEST
    };
  }

  function profileUserSuccess(payload) {
    
    return {
      type: userConstants.PROFILE_USER_SUCCESS,
      payload
    };
  }

  function profileUserFailure(error) {
    
    return {
      type: userConstants.PROFILE_USER_FAILURE,
      payload: error
    };
  }
}
