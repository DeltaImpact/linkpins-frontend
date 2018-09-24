import { pinConstants } from "../constants";
import { pinService } from "../services";

export const pinActions = {
  addPin,
  deletePin,
  getPins,
};

function addPin(name, description, img, isPrivate) {
  
  return function(dispatch) {
    let pinParams = {
      name,
      description,
      img,
      isPrivate
    };
    dispatch(addPinRequest(pinParams));
    return pinService.addPin(name, description, img, isPrivate).then(
      response => {
        
        dispatch(addPinSuccess(response));
      },
      error => {
        
        dispatch(addPinFailure(error));
      }
    );
  };
}

export function addPinRequest(tmp) {
  return {
    type: pinConstants.ADD_BOARD_REQUEST,
    payload: {
      tmp
    }
  };
}

export function addPinSuccess(payload) {
  return {
    type: pinConstants.ADD_BOARD_SUCCESS,
    payload
  };
}

export function addPinFailure(error) {
  return {
    type: pinConstants.ADD_BOARD_FAILURE,
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
    type: pinConstants.GETALL_BOARD_REQUEST
  };
}

export function getPinsSuccess(payload) {
  return {
    type: pinConstants.GETALL_BOARD_SUCCESS,
    payload
  };
}

export function getPinsFailure(error) {
  
  return {
    type: pinConstants.GETALL_BOARD_FAILURE,
    payload: error
  };
}



function deletePin(name) {
  
    return function(dispatch) {
      let pinParams = {
        name,
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
      type: pinConstants.DELETE_BOARD_REQUEST,
      payload: {
        tmp
      }
    };
  }
  
  export function deletePinSuccess(payload) {
    return {
      type: pinConstants.DELETE_BOARD_SUCCESS,
      payload
    };
  }
  
  export function deletePinFailure(error) {
    return {
      type: pinConstants.DELETE_BOARD_FAILURE,
      payload: error
    };
  }