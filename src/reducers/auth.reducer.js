let user = JSON.parse(localStorage.getItem('user'));
import { createReducer } from '../utils/misc';
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
} from '../constants/user.constants';

const reducerInitialState = {
    user: user,
    isAuthenticated: false,
    statusText: null,
    loading: null,
    items: null,
    error: null,
};

export default createReducer(reducerInitialState, {
    LOGIN_USER_REQUEST: (state) =>
        Object.assign({}, state, {
            statusText: null,
            loading: true,
        }),
    LOGIN_USER_SUCCESS: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: true,
            // statusText: 'You have been successfully logged in.',
            loading: false,
            user: payload,
        }),
    LOGIN_USER_FAILURE: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            statusText: payload.errorMessage,
            loading: false,
            user: null,
        }),
    LOGOUT_USER: (state) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            // statusText: 'You have been successfully logged out.',
            user: null,
        }),
    REGISTER_USER_REQUEST: (state) =>
        Object.assign({}, state, {
            loading: true,
            statusText: null,
        }),
    REGISTER_USER_SUCCESS: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: true,
            // statusText: 'You have been successfully registered.',
            loading: false,
            user: payload,
        }),
    REGISTER_USER_FAILURE: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            // registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`,
            statusText: payload.errorMessage,
            loading: false,
            user: null,
        }),
});
