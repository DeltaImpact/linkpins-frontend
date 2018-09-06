
// const initialState = user ? { loggedIn: true, user } : {};

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
    username: null,
    email: null,
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

let user = JSON.parse(localStorage.getItem('user'));
if (user){
    reducerInitialState.username = user.username;
    reducerInitialState.email = user.email;
    reducerInitialState.token = user.token;
    reducerInitialState.user = user;


}
// let givitme = {
//     LOGIN_USER_REQUEST: (state) =>
//         Object.assign({}, state, {
//             isAuthenticating: true,
//             statusText: null,
//             loading: true
//         })
// };
// debugger

export default createReducer(reducerInitialState, {
    LOGIN_USER_REQUEST: (state) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null,
            loading: true,
        }),
    LOGIN_USER_SUCCESS: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            token: payload.token.token,
            // username: payload.username,
            // email: payload.email,
            statusText: 'You have been successfully logged in.',
            loading: false,
            user: payload.token,
        }),
    LOGIN_USER_FAILURE: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            // username: null,
            statusText: payload.errorMessage,
            loading: false,
        }),
    LOGOUT_USER: (state) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            // email: null,
            // username: null,
            // statusText: 'You have been successfully logged out.',
            statusText: null,
            user: null,
        }),
    REGISTER_USER_REQUEST: (state) =>
        Object.assign({}, state, {
            isRegistering: true,
            loading: true,
            registerStatusText: null,
        }),
    REGISTER_USER_SUCCESS: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            isRegistering: false,
            token: payload.token.token,
            // username: payload.username,
            // email: payload.email,
            registerStatusText: 'You have been successfully registered.',
            loading: false,
            user: payload.token,
        }),
    REGISTER_USER_FAILURE: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            // username: null,
            // registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`,
            registerStatusText: payload.errorMessage,
            loading: false,
        }),
});
