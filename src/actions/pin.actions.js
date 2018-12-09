import { pinConstants } from "../constants";
import { pinService } from "../services";
import { history } from "../helpers";

export const pinActions = {
  addPin,
  deletePin,
  getPins,
  getPin,
  updatePin,
  getBoardsWherePinSaved,
  getBoardsWherePinNotSaved,
  addPinToBoard,
  deletePinFromBoard
};

function updatePin(id, name, description) {
  return function(dispatch) {
    let boardParams = {
      id,
      name,
      description
    };
    dispatch(updatePinRequest(boardParams));
    return pinService.updatePin(id, name, description).then(
      response => {
        dispatch(updatePinSuccess(response));
      },
      error => {
        dispatch(updatePinFailure(error));
      }
    );
  };
}

export function updatePinRequest(payload) {
  return {
    type: pinConstants.UPDATE_PIN_REQUEST,
    payload
  };
}

export function updatePinSuccess(payload) {
  return {
    type: pinConstants.UPDATE_PIN_SUCCESS,
    payload
  };
}

export function updatePinFailure(error) {
  return {
    type: pinConstants.UPDATE_PIN_FAILURE,
    payload: error
  };
}

function addPin(name, description, img, Link, id) {
  return function(dispatch) {
    let pinParams = {
      name,
      description,
      img,
      Link,
      id
    };
    debugger
    dispatch(addPinRequest(pinParams));
    return pinService.addPin(name, description, img, Link, id).then(
      response => {
        dispatch(addPinSuccess(response));
        let pinAddress = "/pin/" + response.id;
        history.push(pinAddress);
      },
      error => {
        dispatch(addPinFailure(error));
      }
    );
  };
}

export function addPinRequest(tmp) {

  return {
    type: pinConstants.ADD_PIN_REQUEST,
    payload: {
      tmp
    }
  };
}

export function addPinSuccess(payload) {

  return {
    type: pinConstants.ADD_PIN_SUCCESS,
    payload
  };
}

export function addPinFailure(error) {
  return {
    type: pinConstants.ADD_PIN_FAILURE,
    payload: error
  };
}

function getPins() {
  return function(dispatch) {
    dispatch(getPinsRequest());
    return pinService.getPins().then(
      response => {
        dispatch(getPinsSuccess(response));
      },
      error => {
        dispatch(getPinsFailure(error));
      }
    );
  };
}

export function getPinsRequest() {
  return {
    type: pinConstants.GETALL_PIN_REQUEST
  };
}

export function getPinsSuccess(payload) {
  return {
    type: pinConstants.GETALL_PIN_SUCCESS,
    payload
  };
}

export function getPinsFailure(error) {
  return {
    type: pinConstants.GETALL_PIN_FAILURE,
    payload: error
  };
}

function deletePin(name) {
  return function(dispatch) {
    let pinParams = {
      name
    };
    dispatch(deletePinRequest(pinParams));
    return pinService.deletePin(name).then(
      response => {
        dispatch(deletePinSuccess(response));
      },
      error => {
        dispatch(deletePinFailure(error));
      }
    );
  };
}

export function deletePinRequest(tmp) {
  return {
    type: pinConstants.DELETE_PIN_REQUEST,
    payload: {
      tmp
    }
  };
}

export function deletePinSuccess(payload) {
  return {
    type: pinConstants.DELETE_PIN_SUCCESS,
    payload
  };
}

export function deletePinFailure(error) {
  return {
    type: pinConstants.DELETE_PIN_FAILURE,
    payload: error
  };
}

function getPin(id) {
  return function(dispatch) {
    dispatch(getPinRequest());
    return pinService.getPin(id).then(
      response => {
        dispatch(getPinSuccess(response));
      },
      error => {
        dispatch(getPinFailure(error));
      }
    );
  };
}

export function getPinRequest() {
  return {
    type: pinConstants.GET_PIN_REQUEST
  };
}

export function getPinSuccess(payload) {
  return {
    type: pinConstants.GET_PIN_SUCCESS,
    payload
  };
}

export function getPinFailure(error) {
  return {
    type: pinConstants.GET_PIN_FAILURE,
    payload: error
  };
}

function getBoardsWherePinSaved(id) {
  return function(dispatch) {
    dispatch(getBoardsWherePinSavedRequest());
    return pinService.getBoardsWherePinSaved(id).then(
      response => {
        dispatch(getBoardsWherePinSavedSuccess(response));
      },
      error => {
        dispatch(getBoardsWherePinSavedFailure(error));
      }
    );
  };
}

export function getBoardsWherePinSavedRequest() {
  return {
    type: pinConstants.GET_PIN_BOARDS_REQUEST
  };
}

export function getBoardsWherePinSavedSuccess(payload) {
  return {
    type: pinConstants.GET_PIN_BOARDS_SUCCESS,
    payload
  };
}

export function getBoardsWherePinSavedFailure(error) {
  return {
    type: pinConstants.GET_PIN_BOARDS_FAILURE,
    payload: error
  };
}

function getBoardsWherePinNotSaved(id) {
  return function(dispatch) {
    dispatch(getBoardsWherePinNotSavedRequest());
    return pinService.getBoardsWherePinNotSaved(id).then(
      response => {
        dispatch(getBoardsWherePinNotSavedSuccess(response));
      },
      error => {
        dispatch(getBoardsWherePinNotSavedFailure(error));
      }
    );
  };
}

export function getBoardsWherePinNotSavedRequest() {
  return {
    type: pinConstants.GET_PIN_AVALIABE_BOARDS_REQUEST
  };
}

export function getBoardsWherePinNotSavedSuccess(payload) {
  return {
    type: pinConstants.GET_PIN_AVALIABE_BOARDS_SUCCESS,
    payload
  };
}

export function getBoardsWherePinNotSavedFailure(error) {
  return {
    type: pinConstants.GET_PIN_AVALIABE_BOARDS_FAILURE,
    payload: error
  };
}

function addPinToBoard(pinId, boardId) {
  return function(dispatch) {
    let pinParams = {
      pinId,
      boardId
    };
    dispatch(addPinToBoardRequest(pinParams));
    return pinService.addPinToBoard(pinId, boardId).then(
      response => {
        dispatch(addPinToBoardSuccess(response));
      },
      error => {
        dispatch(addPinToBoardFailure(error));
      }
    );
  };
}

export function addPinToBoardRequest(tmp) {
  return {
    type: pinConstants.ADD_PIN_TO_BOARD_REQUEST,
    payload: {
      tmp
    }
  };
}

export function addPinToBoardSuccess(payload) {
  return {
    type: pinConstants.ADD_PIN_TO_BOARD_SUCCESS,
    payload
  };
}

export function addPinToBoardFailure(error) {
  return {
    type: pinConstants.ADD_PIN_TO_BOARD_FAILURE,
    payload: error
  };
}

function deletePinFromBoard(pinId, boardId) {
  return function(dispatch) {
    let pinParams = {
      pinId,
      boardId
    };
    dispatch(deletePinFromBoardRequest(pinParams));
    return pinService.deletePinFromBoard(pinId, boardId).then(
      response => {
        dispatch(deletePinFromBoardSuccess(response));
      },
      error => {
        dispatch(deletePinFromBoardFailure(error));
      }
    );
  };
}

export function deletePinFromBoardRequest(tmp) {

  return {
    type: pinConstants.DELETE_PIN_FROM_BOARD_REQUEST,
    payload: {
      tmp
    }
  };
}

export function deletePinFromBoardSuccess(payload) {

  return {
    type: pinConstants.DELETE_PIN_FROM_BOARD_SUCCESS,
    payload
  };
}

export function deletePinFromBoardFailure(error) {
  return {
    type: pinConstants.DELETE_PIN_FROM_BOARD_FAILURE,
    payload: error
  };
}

