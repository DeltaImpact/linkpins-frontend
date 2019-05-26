import { createReducer } from "../utils/misc";
import {
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  UPDATE_BOARD_REQUEST,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_FAILURE,
  GETALL_BOARD_REQUEST,
  GETALL_BOARD_SUCCESS,
  GETALL_BOARD_FAILURE,
  GET_BOARD_REQUEST,
  GET_BOARD_SUCCESS,
  GET_BOARD_FAILURE,
  GET_BOARD_PINS_REQUEST,
  GET_BOARD_PINS_SUCCESS,
  GET_BOARD_PINS_FAILURE,

} from "../constants/board.constants";

const reducerInitialState = {
  boards: [],
  board: null,
  statusText: null,
  loading: null,
  getAllBoardsError: null,
  getAllBoardsLoading: null,
  getBoard: null,
  getBoardError: null,
  getBoardLoading: null,
  AddBoardError: null,
  AddBoardLoading: null,
  deleteBoardError: null,
  deleteBoardLoading: null,
  updateBoardLoading: null,
  updateBoardId: null,
  updateBoardError: null,
  getBoardPinsTake: 15,
  getBoardPins: null,
  getBoardPinsError: null,
  getBoardPinsLoading: null,
};

export default createReducer(reducerInitialState, {
  ADD_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      statusText: null,
      AddBoardLoading: true,
      AddBoardError: null
    }),
  ADD_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      // statusText: 'You have been successfully logged in.',
      AddBoardLoading: false,
      board: payload,
      boards: [...state.boards, payload]
    }),
  ADD_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      AddBoardLoading: false,
      board: null,
      AddBoardError: payload
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
      boards: state.boards.filter(t => t.id != payload.id)
    }),
  DELETE_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      deleteBoardLoading: false,
      board: null,
      deleteBoardError: payload
    }),
  UPDATE_BOARD_REQUEST: (state, payload)  =>
    Object.assign({}, state, {
      // updateBoard: null,
      updateBoardLoading: true,
      updateBoardError: null,
      updateBoardId: payload.id,
    }),
  UPDATE_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      updateBoardLoading: false,
      boards: state.boards.map(function(item) { return item.id == payload.id ? payload : item }),
    }),
  UPDATE_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      updateBoardLoading: false,
      // updateBoard: null,
      updateBoardError: payload,
    }),
  GETALL_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      getAllBoardsLoading: true,
      statusText: null,
      getAllBoardsError: null
    }),
  GETALL_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getAllBoardsLoading: false,
      boards: payload
    }),
  GETALL_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      getAllBoardsLoading: false,
      boards: null,
      getAllBoardsError: payload
    }),
  GET_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      getBoardLoading: true,
      statusText: null,
      getBoardError: null
    }),
  GET_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getBoardLoading: false,
      getBoard: payload
    }),
  GET_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      getBoardLoading: false,
      getBoard: null,
      getBoardError: payload
    }),
    GET_BOARD_PINS_REQUEST: state =>
    Object.assign({}, state, {
      getBoardPinsLoading: true,
      getBoardPinsError: null
    }),
  GET_BOARD_PINS_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getBoardPinsLoading: false,
      getBoardPins: payload,
    }),
  GET_BOARD_PINS_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getBoardPinsLoading: false,
      getBoardPins: null,
      getBoardPinsError: payload
    }),
});
