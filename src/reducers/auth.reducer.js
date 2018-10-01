let user = JSON.parse(localStorage.getItem("user"));
import { createReducer } from "../utils/misc";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from "../constants/user.constants";

const reducerInitialState = {
  loginLoading: null,
  registerLoading: null,
  loginStatusText: null,
  registerStatusText: null,

  user: user,
  isAuthenticated: false,
  statusText: null,

  loading: null,

  items: null,
  error: null
};

export default createReducer(reducerInitialState, {
  LOGIN_USER_REQUEST: state =>
    Object.assign({}, state, {
      isAuthenticated: false,
      loginStatusText: null,
      loginLoading: true,
      user: null,
    }),
  LOGIN_USER_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticated: true,
      loginLoading: false,
      user: payload,
    }),
  LOGIN_USER_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      loginStatusText: payload.errorMessage,
      loginLoading: false,
    }),
  LOGOUT_USER: state =>
    Object.assign({}, state, {
      isAuthenticated: false,
      user: null,
    }),
  REGISTER_USER_REQUEST: state =>
    Object.assign({}, state, {
      isAuthenticated: false,
      registerLoading: true,
      registerStatusText: null,
      user: null,
    }),
  REGISTER_USER_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticated: true,
      registerLoading: false,
      user: payload,
    }),
  REGISTER_USER_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      registerStatusText: payload.errorMessage,
      registerLoading: false,
    })
});
