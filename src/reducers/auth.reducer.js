let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

import jwtDecode from 'jwt-decode';
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
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    isRegistering: false,
    isRegistered: false,
    registerStatusText: null,
    loading: null,
    items: null,
    error: null,
};

export default createReducer(reducerInitialState, {
    LOGIN_USER_REQUEST: (state) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null,
            loading: true,
            state: state,
        }),
    LOGIN_USER_SUCCESS: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            token: payload.token,
            userName: jwtDecode(payload.token).email,
            statusText: 'You have been successfully logged in.',
            loading: false,
            state: state,
        }),
    LOGIN_USER_FAILURE: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: payload.errorMessage,
            loading: false,
            state: state,
        }),
    LOGOUT_USER: (state) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: 'You have been successfully logged out.',
            state: state,
        }),
    REGISTER_USER_REQUEST: (state) =>
        Object.assign({}, state, {
            isRegistering: true,
            loading: true,
            state: state,
            registerStatusText: null,
        }),
    REGISTER_USER_SUCCESS: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            isRegistering: false,
            token: payload.token,
            userName: jwtDecode(payload.token).email,
            registerStatusText: 'You have been successfully registered.',
            loading: false,
            state: state,
        }),
    REGISTER_USER_FAILURE: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null,
            // registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`,
            registerStatusText: payload.errorMessage,
            loading: false,
            state: state,
        }),
});
