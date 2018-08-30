import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

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

function register(email, password, username) {

    return dispatch => {
        dispatch(request({
            email
        }));

        userService.register(email, password, username)
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
            type: userConstants.REGISTER_USER_REQUEST,
            user
        }
    }

    function success(user) {
        return {
            type: userConstants.REGISTER_USER_SUCCESS,
            user
        }
    }

    function failure(error) {
        return {
            type: userConstants.REGISTER_USER_FAILURE({
                response: {
                    status: 403,
                    statusText: 'Ata ata',
                },
            }
            ),
            error
        }
    }
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

    function success(users) {
        return {
            type: userConstants.PROFILE_SUCCESS,
            users
        }
    }

    function failure(error) {
        return {
            type: userConstants.PROFILE_FAILURE,
            error
        }
    }
}