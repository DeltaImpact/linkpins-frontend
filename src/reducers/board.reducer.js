import { createReducer } from "../utils/misc";
import {
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  GETALL_BOARD_REQUEST,
  GETALL_BOARD_SUCCESS,
  GETALL_BOARD_FAILURE
} from "../constants/board.constants";

const reducerInitialState = {
  boards: null,
  board: null,
  statusText: null,
  loading: null,
  getAllBoardsError: null,
  AddBoardError: null,
  AddBoardLoading: null,
  deleteBoardError: null,
  deleteBoardLoading: null,
};

export default createReducer(reducerInitialState, {
  ADD_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      statusText: null,
      AddBoardLoading: true
    }),
  ADD_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      // statusText: 'You have been successfully logged in.',
      AddBoardLoading: false,
      board: payload,
      boards: [
        ...state.boards,
        payload.board
      ]
    }),
  ADD_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      AddBoardLoading: false,
      board: null,
      AddBoardError: payload,
    }),
    DELETE_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      statusText: null,
      deleteBoardLoading: true
    }),
  DELETE_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      // statusText: 'You have been successfully logged in.',
      deleteBoardLoading: false,
      board: payload,
      boards: state.boards.filter(t => t.id != payload.board.id)
    }),
  DELETE_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      deleteBoardLoading: false,
      board: null,
      deleteBoardError: payload,
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
      statusText: payload.statusText,
      loading: false,
      boards: null,
      getAllBoardsError: payload,
    })
});
