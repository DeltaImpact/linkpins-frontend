import { createReducer } from "../utils/misc";
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_PASSWORD_CHANGE_REQUEST,
  PROFILE_PASSWORD_CHANGE_SUCCESS,
  PROFILE_PASSWORD_CHANGE_FAILURE,
  PROFILE_CHANGE_REQUEST,
  PROFILE_CHANGE_SUCCESS,
  PROFILE_CHANGE_FAILURE
} from "../constants";

const reducerInitialState = {
  getProfileObject: null,
  getProfileLoading: null,
  getProfileError: null,
  passwordChangeStatusText: null,
  passwordChangeLoading: null,
  passwordChangeError: null
};

export default createReducer(reducerInitialState, {
  PROFILE_PASSWORD_CHANGE_REQUEST: state =>
    Object.assign({}, state, {
      passwordChangeLoading: true,
      passwordChangeError: null
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
  PROFILE_USER_REQUEST: state =>
    Object.assign({}, state, {
      getProfileObject: null,
      getProfileLoading: true,
      getProfileError: null
    }),
  PROFILE_USER_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getProfileObject: payload,
      getProfileLoading: false
    }),
  PROFILE_USER_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getProfileLoading: false,
      getProfileError: payload
    })
});
