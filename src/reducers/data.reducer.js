
import { createReducer } from '../utils/misc';
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PARSE_PAGE_REQUEST,
  PARSE_PAGE_SUCCESS,
  PARSE_PAGE_FAILURE,
} from '../constants';

const reducerInitialState = {
  user: null,
  userProfile: null,
  statusText: null,
  loading: null,
  items: null,
  error: null,
  page: null,
};

export default createReducer(reducerInitialState, {
  PROFILE_USER_REQUEST: (state) =>
    Object.assign({}, state, {
      userProfile: null,
      statusText: null,
      loading: true,
      error: null,
    }),
  PROFILE_USER_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      userProfile: payload,
      loading: false,
    }),
  PROFILE_USER_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      loading: false,
      error: payload,
    }),
  PARSE_PAGE_REQUEST: (state) =>
    Object.assign({}, state, {
      statusText: null,
      loading: true,
      page: null,
      error: null,
    }),
  PARSE_PAGE_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      page: payload,
      loading: false,
    }),
  PARSE_PAGE_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      // statusText: payload.errorMessage,
      loading: false,
      error: payload,
    }),
});
