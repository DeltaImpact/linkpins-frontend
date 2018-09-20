import { createReducer } from "../utils/misc";
import {
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
  GETALL_BOARD_REQUEST,
  GETALL_BOARD_SUCCESS,
  GETALL_BOARD_FAILURE
} from "../constants/data.constants";

const reducerInitialState = {
  boards: null,
  board: null,
  statusText: null,
  loading: null,
  error: null
};

export default createReducer(reducerInitialState, {
  ADD_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      statusText: null,
      loading: true
    }),
  ADD_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      // statusText: 'You have been successfully logged in.',
      loading: false,
      board: payload
    }),
  ADD_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.errorMessage,
      loading: false,
      board: null,
      error: payload,
    }),
  GETALL_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      loading: true,
      statusText: null
    }),
  GETALL_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticated: true,
      loading: false,
      boards: payload
    }),
  GETALL_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.response.statusText,
      loading: false,
      boards: null,
      error: payload.response,
    })
});
