
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
  loading: null,
  items: null,
  error: null,
  page: null,
};

export default createReducer(reducerInitialState, {
  PARSE_PAGE_REQUEST: (state) =>
    Object.assign({}, state, {
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
      loading: false,
      error: payload,
    }),
});
