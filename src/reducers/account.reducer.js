let user = JSON.parse(localStorage.getItem("user"));
import { createReducer } from "../utils/misc";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_PASSWORD_CHANGE_REQUEST,
  PROFILE_PASSWORD_CHANGE_SUCCESS,
  PROFILE_PASSWORD_CHANGE_FAILURE,
  PROFILE_CHANGE_REQUEST,
  PROFILE_CHANGE_SUCCESS,
  PROFILE_CHANGE_FAILURE
} from "../constants/user.constants";

const reducerInitialState = {
  loginLoading: null,
  registerLoading: null,
  loginError: null,
  registerError: null,

  user: user,
  isAuthenticated: false,
  // statusText: null,
  // loading: null,
  // items: null,
  // error: null

  profileGetObject: null,
  profileGetLoading: null,
  profileGetError: null,
  profileChangeLoading: null,
  profileChangeError: null,
  passwordChangeStatusText: null,
  passwordChangeLoading: null,
  passwordChangeError: null,
  passwordChangeStatusText: null
};

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

export default createReducer(reducerInitialState, {
  LOGIN_USER_REQUEST: state =>
    Object.assign({}, state, {
      isAuthenticated: false,
      loginError: null,
      loginLoading: true,
      user: null
    }),
  LOGIN_USER_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticated: true,
      loginLoading: false,
      user: payload
    }),
  LOGIN_USER_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      loginError: payload,
      loginLoading: false
    }),
  LOGOUT_USER: state =>
    Object.assign({}, state, {
      isAuthenticated: false,
      user: null
    }),
  REGISTER_USER_REQUEST: state =>
    Object.assign({}, state, {
      isAuthenticated: false,
      registerLoading: true,
      registerError: null,
      user: null
    }),
  REGISTER_USER_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticated: true,
      registerLoading: false,
      user: payload
    }),
  REGISTER_USER_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      registerError: payload,
      registerLoading: false
    }),

  PROFILE_USER_REQUEST: state =>
    Object.assign({}, state, {
      profileGetObject: null,
      profileGetLoading: true,
      profileGetError: null
    }),
  PROFILE_USER_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      profileGetObject: payload,
      profileGetLoading: false
    }),
  PROFILE_USER_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      profileGetLoading: false,
      profileGetError: payload
    }),
  PROFILE_PASSWORD_CHANGE_REQUEST: state =>
    Object.assign({}, state, {
      passwordChangeLoading: true,
      passwordChangeError: null,
      passwordChangeStatusText: null
    }),
  PROFILE_PASSWORD_CHANGE_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      passwordChangeStatusText: "Password changed",
      passwordChangeLoading: false
    }),
  PROFILE_PASSWORD_CHANGE_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      passwordChangeLoading: false,
      passwordChangeError: payload
    }),
  PROFILE_CHANGE_REQUEST: state =>
    Object.assign({}, state, {
      profileChangeLoading: true,
      profileChangeError: null
    }),
  PROFILE_CHANGE_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      profileChangeLoading: false,
      // user: Object.assign(user, clean(payload))
      user: Object.assign(user, {
        username: payload.userName,
        email: payload.email,
        // role: payload.role,
      })
    }),
  PROFILE_CHANGE_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      profileChangeLoading: false,
      profileChangeError: payload
    })
});
