import { createReducer } from "../utils/misc";
import {
  ADD_PIN_REQUEST,
  ADD_PIN_SUCCESS,
  ADD_PIN_FAILURE,
  DELETE_PIN_REQUEST,
  DELETE_PIN_SUCCESS,
  DELETE_PIN_FAILURE,
  GETALL_PIN_REQUEST,
  GETALL_PIN_SUCCESS,
  GETALL_PIN_FAILURE,
  GET_PIN_BOARDS_REQUEST,
  GET_PIN_BOARDS_SUCCESS,
  GET_PIN_BOARDS_FAILURE,
  GET_PIN_AVALIABE_BOARDS_REQUEST,
  GET_PIN_AVALIABE_BOARDS_SUCCESS,
  GET_PIN_AVALIABE_BOARDS_FAILURE,
  ADD_PIN_TO_BOARD_REQUEST,
  ADD_PIN_TO_BOARD_SUCCESS,
  ADD_PIN_TO_BOARD_FAILURE,
  DELETE_PIN_FROM_BOARD_REQUEST,
  DELETE_PIN_FROM_BOARD_SUCCESS,
  DELETE_PIN_FROM_BOARD_FAILURE,
  GET_PIN_MAIN_PAGE_REQUEST,
  GET_PIN_MAIN_PAGE_SUCCESS,
  GET_PIN_MAIN_PAGE_FAILURE
} from "../constants/pin.constants";

const reducerInitialState = {
  pins: null,
  pin: null,
  getPinLoading: null,
  AddPinError: null,
  loading: null,
  getAllPinsLoading: null,
  getAllPinsError: null,
  AddPinLoading: null,
  AddPinRedirectTo: null,
  deletePinError: null,
  deletePinLoading: null,
  updatePinLoading: null,
  updatePinError: null,
  updatePinId: null,
  AddPinToBoardLoading: null,
  AddPinToBoard: null,
  AddPinToBoardError: null,
  DeletePinFromBoardLoading: null,
  DeletePinFromBoard: null,
  DeletePinFromBoardError: null,
  GetPinBoardsLoading: null,
  GetPinBoards: null,
  GetPinBoardsError: null,
  GetPinAvaliableBoardsLoading: null,
  GetPinAvaliableBoards: null,
  GetPinAvaliableBoardsError: null,
  getMainPageLoading: null,
  getMainPage: null,
  getMainPageError: null
};

export default createReducer(reducerInitialState, {
  GET_PIN_MAIN_PAGE_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      // updatePin: null,
      getMainPageLoading: true,
      updatePinError: null,
    }),
  GET_PIN_MAIN_PAGE_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getMainPageLoading: false,
      getMainPage: payload
    }),
  GET_PIN_MAIN_PAGE_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getMainPageLoading: false,
      getMainPageError: payload
    }),
  ADD_PIN_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      AddPinLoading: true,
      AddPinRedirectTo: null,
      AddPinError: payload
    }),
  ADD_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      AddPinLoading: false,
      AddPinRedirectTo: payload.id
    }),
  ADD_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      AddPinLoading: false,
      pin: null,
      AddPinError: payload
    }),
  UPDATE_PIN_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      // updatePin: null,
      updatePinLoading: true,
      updatePinError: null,
      updatePinId: payload.id
    }),
  UPDATE_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      updatePinLoading: false
    }),
  UPDATE_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      updatePinLoading: false,
      // updatePin: null,
      updatePinError: payload
    }),
  DELETE_PIN_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      deletePinLoading: true,
      deletePinError: true
    }),
  DELETE_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      deletePinLoading: false,
      pin: payload
      // pins: state.pins.filter(t => t.id != payload.pin.id)
    }),
  DELETE_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      deletePinLoading: false,
      pin: null,
      deletePinError: payload
    }),
  GETALL_PIN_REQUEST: state =>
    Object.assign({}, state, {
      getAllPinsLoading: true,
      getAllPinsError: null
    }),
  GETALL_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getAllPinsLoading: false,
      pins: payload
    }),
  GETALL_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getAllPinsLoading: false,
      pins: null,
      getAllPinsError: payload
    }),
  GET_PIN_REQUEST: state =>
    Object.assign({}, state, {
      getPinLoading: true,
      getPinError: null
    }),
  GET_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getPinLoading: false,
      pin: payload
    }),
  GET_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getPinLoading: false,
      pin: null,
      getPinError: payload
    }),
  ADD_PIN_TO_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      AddPinToBoardLoading: true,
      AddPinToBoardError: null
    }),
  ADD_PIN_TO_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      AddPinToBoardLoading: false,
      GetPinBoards: [...state.GetPinBoards, payload],
      GetPinAvaliableBoards: state.GetPinAvaliableBoards.filter(
        t => t.id != payload.id
      )
    }),
  ADD_PIN_TO_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      AddPinToBoardLoading: false,
      AddPinToBoard: null,
      AddPinToBoardError: payload
    }),
  DELETE_PIN_FROM_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      DeletePinFromBoardLoading: true,
      DeletePinFromBoardError: null
    }),
  DELETE_PIN_FROM_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      DeletePinFromBoardLoading: false,
      GetPinAvaliableBoards: [...state.GetPinAvaliableBoards, payload],
      GetPinBoards: state.GetPinBoards.filter(t => t.id != payload.id)
    }),
  DELETE_PIN_FROM_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      DeletePinFromBoardLoading: false,
      DeletePinFromBoard: null,
      DeletePinFromBoardError: payload
    }),
  GET_PIN_BOARDS_REQUEST: state =>
    Object.assign({}, state, {
      GetPinBoardsLoading: true,
      GetPinBoardsError: null
    }),
  GET_PIN_BOARDS_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      GetPinBoardsLoading: false,
      GetPinBoards: payload
    }),
  GET_PIN_BOARDS_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      GetPinBoardsLoading: false,
      GetPinBoards: null,
      GetPinBoardsError: payload
    }),
  GET_PIN_AVALIABE_BOARDS_REQUEST: state =>
    Object.assign({}, state, {
      GetPinAvaliableBoardsLoading: true,
      GetPinAvaliableBoardsError: null
    }),
  GET_PIN_AVALIABE_BOARDS_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      GetPinAvaliableBoardsLoading: false,
      GetPinAvaliableBoards: payload
    }),
  GET_PIN_AVALIABE_BOARDS_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      GetPinAvaliableBoardsLoading: false,
      GetPinAvaliableBoards: null,
      DeletePinFromBoardError: payload
    })
});
