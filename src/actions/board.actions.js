import { dataConstants } from '../constants';
import { boardService } from '../services';

export const boardActions = {
    addBoard,
    getBoards,
};

function addBoard(name, description, img, isPrivate) {
    // debugger
    return function (dispatch) {
        let boardParams = {
            name, description, img, isPrivate
        }
        dispatch(addBoardRequest(boardParams));
        return boardService.addBoard(name, description, img, isPrivate)
            .then(
                response => {
                    // debugger
                    dispatch(addBoardSuccess(response));
                },
                error => {
                    // debugger
                    dispatch(addBoardFailure(error));
                }
            );
    };


}

export function addBoardRequest(tmp) {
    return {
        type: dataConstants.ADD_BOARD_REQUEST,
        payload: {
            tmp,
        },
    };
}

export function addBoardSuccess(payload) {
    return {
        type: dataConstants.ADD_BOARD_SUCCESS,
        payload: payload,
    };
}

export function addBoardFailure(error) {
    return {
        type: dataConstants.ADD_BOARD_FAILURE, 
        payload: error, 
        error
    };
}



function getBoards() {
    // debugger
    return function (dispatch) {
        dispatch(getBoardsRequest());
        return boardService.getBoards()
            .then(
                response => {
                    // debugger
                    dispatch(getBoardsSuccess(response));
                },
                error => {
                    // debugger
                    dispatch(getBoardsFailure(error));
                }
            );
    };


}

export function getBoardsRequest() {
    return {
        type: dataConstants.GETALL_BOARD_REQUEST,
    };
}

export function getBoardsSuccess(payload) {
    return {
        type: dataConstants.GETALL_BOARD_SUCCESS,
        payload: payload,
    };
}

export function getBoardsFailure(error) {
    return {
        type: dataConstants.GETALL_BOARD_FAILURE, 
        payload: error
    };
}