import { createReducer } from "../utils/misc";
import {
  GET_DIALOGS_REQUEST,
  GET_DIALOGS_SUCCESS,
  GET_DIALOGS_FAILURE,
  GET_DIALOG_REQUEST,
  GET_DIALOG_SUCCESS,
  GET_DIALOG_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  START_TYPING_TO,
  STOP_TYPING_TO,
} from "../constants/chat.constants";

const reducerInitialState = {
  GetDialogs: null,
  GetDialogsLoading: null,
  GetDialogsError: null,
  GetDialog: null,
  GetDialogLoading: null,
  GetDialogError: null,
  SendMessage: null,
  SendMessageLoading: null,
  SendMessageError: null
};

export default createReducer(reducerInitialState, {
  GET_DIALOGS_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      GetDialogsLoading: true,
      GetDialogsError: null
    }),
  GET_DIALOGS_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      GetDialogsLoading: false,
      GetDialogs: payload
    }),
  GET_DIALOGS_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      GetDialogsLoading: false,
      GetDialogsError: payload
    }),
  GET_DIALOG_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      GetDialogLoading: true,
      GetDialogError: null
    }),
  GET_DIALOG_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      GetDialogLoading: false,
      GetDialog: payload
    }),
  GET_DIALOG_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      GetDialogLoading: false,
      GetDialogError: payload
    }),
  SEND_MESSAGE_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      SendMessageLoading: true,
      SendMessageError: null
    }),
  SEND_MESSAGE_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      SendMessageLoading: false,
      SendMessage: payload
    }),
  SEND_MESSAGE_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      SendMessageLoading: false,
      SendMessageError: payload
    })
});
