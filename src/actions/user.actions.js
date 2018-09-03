import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import { parseJSON } from '../utils/misc';

export const userActions = {
    login,
    register,
    logout,
    data_about_user
};

function login(email, password) {

    return dispatch => {
        dispatch(request({
            email
        }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) {
        return {
            type: userConstants.LOGIN_REQUEST,
            user
        }
    }

    function success(user) {
        return {
            type: userConstants.LOGIN_SUCCESS,
            user
        }
    }

    function failure(error) {
        return {
            type: userConstants.LOGIN_FAILURE,
            error
        }
    }
}





function register(email, username, password) {
    return function (dispatch) {
        // debugger
        let user = {
            email: email,
            username: username, 
            password: password
        }
        dispatch(registerUserRequest(user));
        // debugger
        return userService.register(email, username, password)
            .then(
                user => {
                    debugger
                    dispatch(registerUserSuccess(user));
                    // dispatch(success(user));
                    history.push('/');
                },
                error => {
                    // debugger
                    // debugger
                    dispatch(registerUserFailure(error));
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };
}

export function registerUserRequest(user) {
    return {
        type: userConstants.REGISTER_USER_REQUEST,
        payload: {
            user,
        },
    };
}

export function registerUserSuccess(token) {
    // localStorage.setItem('token', token);
    return {
        type: userConstants.REGISTER_USER_SUCCESS,
        payload: {
            token,
        },
    };
}

export function registerUserFailure(error) {
    // localStorage.removeItem('token');
    return {
        type: userConstants.REGISTER_USER_FAILURE, payload: error, error
        // payload: {
        //     status: error.response.status,
        //     statusText: error.response.statusText,
        // },
    };
}














function logout() {
    userService.logout();
    return {
        type: userConstants.LOGOUT
    };
}

function data_about_user() {
    return dispatch => {
        dispatch(request());

        userService.data_about_user()
            .then(
                user => {
                    dispatch(success(user))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };

    function request() {
        return {
            type: userConstants.PROFILE_REQUEST
        }
    }

    function success(data) {
        return {
            type: userConstants.PROFILE_SUCCESS,
            data
        }
    }

    function failure(error) {
        return {
            type: userConstants.PROFILE_FAILURE,
            error
        }
    }
}