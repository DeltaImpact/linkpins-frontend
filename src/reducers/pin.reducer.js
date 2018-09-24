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
  AddPinError: null,
  AddPinLoading: null,
  deletePinError: null,
  deletePinLoading: null,
};

export default createReducer(reducerInitialState, {
  ADD_PIN_REQUEST: state =>
    Object.assign({}, state, {
      statusText: null,
      AddPinLoading: true
    }),
  ADD_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      // statusText: 'You have been successfully logged in.',
      AddPinLoading: false,
      pin: payload,
      pins: [
        ...state.pins,
        payload.pin
      ]
    }),
  ADD_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      AddPinLoading: false,
      pin: null,
      AddPinError: payload,
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
      deletePinError: payload,
    }),
  GETALL_PIN_REQUEST: state =>
    Object.assign({}, state, {
      loading: true,
      statusText: null
    }),
  GETALL_PIN_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticated: true,
      loading: false,
      pins: payload
    }),
  GETALL_PIN_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.statusText,
      loading: false,
      pins: null,
      getAllPinsError: payload,
    })
});
