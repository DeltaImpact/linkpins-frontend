import { boardConstants } from "../constants";
import { boardService } from "../services";

export const boardActions = {
  addBoard,
  deleteBoard,
  updateBoard,
  getBoards,
  getBoard
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

function updateBoard(id, name, description, isPrivate) {
  return function(dispatch) {
    let boardParams = {
      id,
      name,
      description,
      isPrivate
    };
    dispatch(updateBoardRequest(boardParams));
    return boardService.updateBoard(id, name, description, isPrivate).then(
      response => {
        dispatch(updateBoardSuccess(response));
      },
      error => {
        dispatch(updateBoardFailure(error));
      }
    );
  };
}

export function updateBoardRequest(tmp) {
  return {
    type: boardConstants.UPDATE_BOARD_REQUEST,
    payload: {
      tmp
    }
  };
}

export function updateBoardSuccess(payload) {
  return {
    type: boardConstants.UPDATE_BOARD_SUCCESS,
    payload
  };
}

export function updateBoardFailure(error) {
  return {
    type: boardConstants.UPDATE_BOARD_FAILURE,
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

function getBoard(id) {
  return function(dispatch) {
    dispatch(getBoardRequest());
    return boardService.getBoard(id).then(
      response => {
        dispatch(getBoardSuccess(response));
      },
      error => {
        dispatch(getBoardFailure(error));
      }
    );
  };
}

export function getBoardRequest() {
  return {
    type: boardConstants.GET_BOARD_REQUEST
  };
}

export function getBoardSuccess(payload) {
  return {
    type: boardConstants.GET_BOARD_SUCCESS,
    payload
  };
}

export function getBoardFailure(error) {
  return {
    type: boardConstants.GET_BOARD_FAILURE,
    payload: error
  };
}

function deleteBoard(name) {
  return function(dispatch) {
    let boardParams = {
      name
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
