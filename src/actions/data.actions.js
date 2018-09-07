import { dataConstants } from '../constants';
import { dataService } from '../services';

export const dataActions = {
    parse,
};

function parse(url) {
    // debugger
    return function (dispatch) {
        let link = {
            url: url,
        }
        dispatch(dataUserRequest(link));
        return dataService.parse(url)
            .then(
                user => {
                    // debugger
                    dispatch(dataUserSuccess(user));
                },
                error => {
                    // debugger
                    dispatch(dataUserFailure(error));
                }
            );
    };


}

export function dataUserRequest(user) {
    return {
        type: dataConstants.PARSE_PAGE_REQUEST,
        payload: {
            user,
        },
    };
}

export function dataUserSuccess(token) {
    return {
        type: dataConstants.PARSE_PAGE_SUCCESS,
        payload: {
            token,
        },
    };
}

export function dataUserFailure(error) {
    return {
        type: dataConstants.PARSE_PAGE_FAILURE, 
        payload: error, 
        error
    };
}