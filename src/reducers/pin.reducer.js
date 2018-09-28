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
  GETALL_PIN_FAILURE
} from "../constants/pin.constants";

const reducerInitialState = {
  pins: null,
  pin: null,
  statusText: null,
  loading: null,
  getAllPinsError: null,
  getPinError: null,
  AddPinError: null,
  AddPinLoading: null,
  AddPinRedirectTo: null,
  deletePinError: null,
  deletePinLoading: null,
  updatePinLoading: null,
  updatePinError: null,
  updatePinId: null,
};
// debugger

export default createReducer(reducerInitialState, {
  ADD_PIN_REQUEST: state =>
    Object.assign({}, state, {
      statusText: null,
      AddPinLoading: true,
      AddPinRedirectTo: null
    }),
  ADD_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      // statusText: 'You have been successfully logged in.',
      AddPinLoading: false,
      AddPinRedirectTo: payload.id
      // pins: [
      //   ...state.pins,
      //   payload.pin
      // ]
    }),
  ADD_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      // statusText: payload.statusText,
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
      // boards: state.boards.map(function(item) {
      //   return item.id == payload.board.id ? payload.board : item;
      // })
    }),
  UPDATE_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      updatePinLoading: false,
      // updatePin: null,
      updatePinError: payload
    }),
  DELETE_PIN_REQUEST: state =>
    Object.assign({}, state, {
      statusText: null,
      deletePinLoading: true
    }),
  DELETE_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      // statusText: 'You have been successfully logged in.',
      deletePinLoading: false,
      pin: payload,
      pins: state.pins.filter(t => t.id != payload.pin.id)
    }),
  DELETE_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      deletePinLoading: false,
      pin: null,
      deletePinError: payload
    }),
  GETALL_PIN_REQUEST: state =>
    Object.assign({}, state, {
      loading: true,
      getAllPinsError: null
    }),
  GETALL_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      loading: false,
      pins: payload
    }),
  GETALL_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      loading: false,
      pins: null,
      getAllPinsError: payload
    }),
  GET_PIN_REQUEST: state =>
    Object.assign({}, state, {
      loading: true,
      getPinError: null
    }),
  GET_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      loading: false,
      pin: payload
    }),
  GET_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      loading: false,
      pin: null,
      getPinError: payload
    })
});
