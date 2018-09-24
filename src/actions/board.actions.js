import { boardConstants } from "../constants";
import { boardService } from "../services";

export const boardActions = {
  addBoard,
  deleteBoard,
  getBoards,
};

function addBoard(name, description, img, isPrivate) {
  
  return function(dispatch) {
    let boardParams = {
      name,
      description,
      img,
      isPrivate
    };
    dispatch(addBoardRequest(boardParams));
    return boardService.addBoard(name, description, img, isPrivate).then(
      response => {
        
        dispatch(addBoardSuccess(response));
      },
      error => {
        
        dispatch(addBoardFailure(error));
      }
    );
  };
}

export function addBoardRequest(tmp) {
  return {
    type: boardConstants.ADD_BOARD_REQUEST,
    payload: {
      tmp
    }
  };
}

export function addBoardSuccess(payload) {
  return {
    type: boardConstants.ADD_BOARD_SUCCESS,
    payload
  };
}

export function addBoardFailure(error) {
  return {
    type: boardConstants.ADD_BOARD_FAILURE,
    payload: error
  };
}

function getBoards() {
  
  return function(dispatch) {
    dispatch(getBoardsRequest());
    return boardService.getBoards().then(
      response => {
        
        dispatch(getBoardsSuccess(response));
      },
      error => {
        
        dispatch(getBoardsFailure(error));
      }
    );
  };
}

export function getBoardsRequest() {
  return {
    type: boardConstants.GETALL_BOARD_REQUEST
  };
}

export function getBoardsSuccess(payload) {
  return {
    type: boardConstants.GETALL_BOARD_SUCCESS,
    payload
  };
}

export function getBoardsFailure(error) {
  
  return {
    type: boardConstants.GETALL_BOARD_FAILURE,
    payload: error
  };
}



function deleteBoard(name) {
  
    return function(dispatch) {
      let boardParams = {
        name,
      };
      dispatch(deleteBoardRequest(boardParams));
      return boardService.deleteBoard(name).then(
        response => {
          
          dispatch(deleteBoardSuccess(response));
        },
        error => {
          
          dispatch(deleteBoardFailure(error));
        }
      );
    };
  }
  
  export function deleteBoardRequest(tmp) {
    return {
      type: boardConstants.DELETE_BOARD_REQUEST,
      payload: {
        tmp
      }
    };
  }
  
  export function deleteBoardSuccess(payload) {
    return {
      type: boardConstants.DELETE_BOARD_SUCCESS,
      payload
    };
  }
  
  export function deleteBoardFailure(error) {
    return {
      type: boardConstants.DELETE_BOARD_FAILURE,
      payload: error
    };
  }