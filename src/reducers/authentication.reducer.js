import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

// debugger
export function authentication(state = initialState, action) {
  //  debugger
  switch (action.type) {
    // case userConstants.LOGIN_REQUEST:
    // return {
    //     loggingIn: true,
    //     user: action.user
    //   };
    // case userConstants.LOGIN_SUCCESS:
    //   return {
    //     loggedIn: true,
    //     user: action.user
    //   };
    // case userConstants.LOGIN_FAILURE:
    //   return {};
    // case userConstants.LOGOUT:
    //   return {};
    default:
      return state
  }
}


// import jwtDecode from 'jwt-decode';
// import { createReducer } from '../utils/misc';
// import {
//   LOGIN_USER_SUCCESS,
//   LOGIN_USER_FAILURE,
//   LOGIN_USER_REQUEST,
//   LOGOUT_USER,
//   REGISTER_USER_FAILURE,
//   REGISTER_USER_REQUEST,
//   REGISTER_USER_SUCCESS,
// } from '../constants/user.constants';

// const reducerInitialState = {
//   user: user,
//   token: null,
//   userName: null,
//   isAuthenticated: false,
//   isAuthenticating: false,
//   statusText: null,
//   isRegistering: false,
//   isRegistered: false,
//   registerStatusText: null,
//   loading: null,
//   items: null,
//   error: null,
// };

// export default createReducer(reducerInitialState, {
//   [LOGIN_USER_REQUEST]: (state) =>
//     Object.assign({}, state, {
//       isAuthenticating: true,
//       statusText: null,
//       loading: true
//     }),
//   [LOGIN_USER_SUCCESS]: (state, payload) =>
//     Object.assign({}, state, {
//       isAuthenticating: false,
//       isAuthenticated: true,
//       token: payload.token,
//       userName: jwtDecode(payload.token).email,
//       statusText: 'You have been successfully logged in.',
//     }),
//   [LOGIN_USER_FAILURE]: (state, payload) =>
//     Object.assign({}, state, {
//       isAuthenticating: false,
//       isAuthenticated: false,
//       token: null,
//       userName: null,
//       statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
//     }),
//   [LOGOUT_USER]: (state) =>
//     Object.assign({}, state, {
//       isAuthenticated: false,
//       token: null,
//       userName: null,
//       statusText: 'You have been successfully logged out.',
//     }),
//   [REGISTER_USER_REQUEST]: (state) =>
//     Object.assign({}, state, {
//       isRegistering: true,
//       loading: true
//     }),
//   [REGISTER_USER_SUCCESS]: (state, payload) =>
//     Object.assign({}, state, {
//       isAuthenticating: false,
//       isAuthenticated: true,
//       isRegistering: false,
//       token: payload.token,
//       userName: jwtDecode(payload.token).email,
//       registerStatusText: 'You have been successfully logged in.',
//     }),
//   [REGISTER_USER_FAILURE]: (state, payload) =>
//     Object.assign({}, state, {
//       isAuthenticated: false,
//       token: null,
//       userName: null,
//       registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`,
//     }),
// });
