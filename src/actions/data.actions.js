import { dataConstants } from '../constants';
import { dataService } from '../services';

export const dataActions = {
    parse,
};

function parse(url) {
    
    return function (dispatch) {
        let link = {
            url: url,
        }
        dispatch(dataUserRequest(link));
        return dataService.parsing(url)
            .then(
                user => {
                    
                    dispatch(dataUserSuccess(user));
                },
                error => {
                    
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

export function dataUserSuccess(payload) {
    return {
        type: dataConstants.PARSE_PAGE_SUCCESS,
        payload: payload,
    };
}

export function dataUserFailure(error) {
    return {
        type: dataConstants.PARSE_PAGE_FAILURE, 
        payload: error, 
        error
    };
}