// import { userConstants } from '../constants';

<<<<<<< .merge_file_a15520
// export function data(state = {}, action) {
//   switch (action.type) {
//     case userConstants.PROFILE_REQUEST:
//       return {
//         loading: true
//       };
//     case userConstants.PROFILE_SUCCESS:
//       return {
//         items: action.data
//       };
//     case userConstants.PROFILE_FAILURE:
//       return {
//         error: action.error
//       };
//     default:
//       return state
//   }
// }


import { createReducer } from '../utils/misc';
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PARSE_PAGE_REQEST,
  PARSE_PAGE_SUCCESS,
  PARSE_PAGE_FAILURE,
} from '../constants';

const reducerInitialState = {
  user: null,
  page: null,
  statusText: null,
  loading: null,
  items: null,
  error: null,
};

export default createReducer(reducerInitialState, {
  PROFILE_REQUEST: (state) =>
  Object.assign({}, state, {
    statusText: null,
    loading: true,
  }),
  PROFILE_SUCCESS: (state, payload) =>
  Object.assign({}, state, {
    page: payload,
    loading: false,
  }),
  PROFILE_FAILURE: (state, payload) =>
  Object.assign({}, state, {
    statusText: payload.errorMessage,
    loading: false,
  }),
  PARSE_PAGE_REQEST: (state) =>
    Object.assign({}, state, {
      statusText: null,
      loading: true,
    }),
    PARSE_PAGE_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      page: payload,
      loading: false,
    }),
    PARSE_PAGE_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      statusText: payload.errorMessage,
      loading: false,
    }),
});
=======
export function data(state = {}, action) {
  switch (action.type) {
    case userConstants.PROFILE_USER_REQUEST:
      return {
        loading: true
      };
    case userConstants.PROFILE_USER_SUCCESS:
      return {
        items: action.data
      };
    case userConstants.PROFILE_USER_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
>>>>>>> .merge_file_a04884
