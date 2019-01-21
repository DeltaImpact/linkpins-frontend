import { chatConstants } from "../constants";
import { chatService } from "../services";
import { history } from "../helpers";

export const chatActions = {
  getDialogs,
  getDialog,
  sendMessage,
  StartTypingTo,
  StopTypingTo
};

function getDialogs() {
  return function(dispatch) {
    dispatch(getDialogsRequest());
    return chatService.getDialogs().then(
      response => {
        dispatch(getDialogsSuccess(response));
      },
      error => {
        dispatch(getDialogsFailure(error));
      }
    );
  };
}

export function getDialogsRequest() {
  return {
    type: chatConstants.GET_DIALOGS_REQUEST
  };
}

export function getDialogsSuccess(payload) {
  return {
    type: chatConstants.GET_DIALOGS_SUCCESS,
    payload
  };
}

export function getDialogsFailure(error) {
  return {
    type: chatConstants.GET_DIALOGS_FAILURE,
    payload: error
  };
}

function getDialog(id) {
  return function(dispatch) {
    dispatch(getDialogRequest());
    return chatService.getDialog(id).then(
      response => {
        dispatch(getDialogSuccess(response));
      },
      error => {
        dispatch(getDialogFailure(error));
      }
    );
  };
}

export function getDialogRequest() {
  return {
    type: chatConstants.GET_DIALOG_REQUEST
  };
}

export function getDialogSuccess(payload) {
  return {
    type: chatConstants.GET_DIALOG_SUCCESS,
    payload
  };
}

export function getDialogFailure(error) {
  return {
    type: chatConstants.GET_DIALOG_FAILURE,
    payload: error
  };
}

function sendMessage(message, sentTo) {
  return function(dispatch) {
    let params = {
      message,
      sentTo
    };
    dispatch(sendMessageRequest(params));
    return chatService.sendMessage(message, sentTo).then(
      response => {
        dispatch(sendMessageSuccess(response));
      },
      error => {
        dispatch(sendMessageFailure(error));
      }
    );
  };
}

export function sendMessageRequest(payload) {
  return {
    type: chatConstants.ADD_PIN_REQUEST,
    payload
  };
}

export function sendMessageSuccess(payload) {
  return {
    type: chatConstants.ADD_PIN_SUCCESS,
    payload
  };
}

export function sendMessageFailure(error) {
  return {
    type: chatConstants.ADD_PIN_FAILURE,
    payload: error
  };
}







function StartTypingTo(id) {
  return function(dispatch) {
    dispatch(StartTypingToRequest());
    return chatService.StartTypingTo(id).then(
      response => {
        // dispatch(StartTypingToSuccess(response));
      },
      error => {
        // dispatch(StartTypingToFailure(error));
      }
    );
  };
}

export function StartTypingToRequest() {
  return {
    type: chatConstants.START_TYPING_TO
  };
}

export function StartTypingToSuccess(payload) {
  return {
    type: chatConstants.GET_DIALOG_SUCCESS,
    payload
  };
}

export function StartTypingToFailure(error) {
  return {
    type: chatConstants.GET_DIALOG_FAILURE,
    payload: error
  };
}

function StopTypingTo(id) {
  return function(dispatch) {
    dispatch(StopTypingToRequest());
    return chatService.StopTypingTo(id).then(
      response => {
        // dispatch(StopTypingToSuccess(response));
      },
      error => {
        // dispatch(StopTypingToFailure(error));
      }
    );
  };
}

export function StopTypingToRequest() {
  return {
    type: chatConstants.STOP_TYPING_TO
  };
}

export function StopTypingToSuccess(payload) {
  return {
    type: chatConstants.GET_DIALOG_SUCCESS,
    payload
  };
}

export function StopTypingToFailure(error) {
  return {
    type: chatConstants.GET_DIALOG_FAILURE,
    payload: error
  };
}