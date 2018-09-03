import { userConstants } from '../constants';

export function data(state = {}, action) {
  switch (action.type) {
    case userConstants.PROFILE_REQUEST:
      return {
        loading: true
      };
    case userConstants.PROFILE_SUCCESS:
      return {
        items: action.data
      };
    case userConstants.PROFILE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}