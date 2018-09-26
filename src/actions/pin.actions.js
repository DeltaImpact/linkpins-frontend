import { pinConstants } from "../constants";
import { pinService } from "../services";
import { history } from "../helpers";

export const pinActions = {
  addPin,
  deletePin,
  getPins,
  getPin
};

function addPin(name, description, img, Link, id) {
  // debugger
  return function(dispatch) {
    let pinParams = {
      name,
      description,
      img,
      Link,
      id
    };
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
  // debugger
  return {
    type: pinConstants.ADD_PIN_REQUEST,
    payload: {
      tmp
    }
  };
}

export function addPinSuccess(payload) {
  // debugger
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
