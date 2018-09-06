import { dataConstants } from '../constants';
import { dataService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import { parseJSON } from '../utils/misc';

export const dataActions = {
    parse,
};

function parse(url) {
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
        type: dataConstants.PARSE_PAGE_REQEST,
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