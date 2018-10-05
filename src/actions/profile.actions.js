import { userConstants } from "../constants";
import { profileService } from "../services";

import { history } from "../helpers";

export const profileActions = {
  dataAboutUser,
  changePassword,
  editProfile
};

function dataAboutUser() {
  return dispatch => {
    dispatch(profileUserRequest());
    profileService.dataAboutUser().then(
      user => {
        dispatch(profileUserSuccess(user));
      },
      error => {
        dispatch(profileUserFailure(error));
      }
    );
  };

  function profileUserRequest() {
    return {
      type: userConstants.PROFILE_USER_REQUEST
    };
  }

  function profileUserSuccess(payload) {
    return {
      type: userConstants.PROFILE_USER_SUCCESS,
      payload
    };
  }

  function profileUserFailure(error) {
    return {
      type: userConstants.PROFILE_USER_FAILURE,
      payload: error
    };
  }
}

function editProfile(email, username, firstName, surName, gender) {
  return function(dispatch) {
    let user = {
      Username: username,
      Email: email,
      FirstName: firstName,
      Surname: surName,
      Gender: gender
    };
    dispatch(editProfileRequest(user));
    return profileService
      .editProfile(email, username, firstName, surName, gender)
      .then(
        user => {
          dispatch(editProfileSuccess(user));
        },
        error => {
          dispatch(editProfileFailure(error));
        }
      );
  };
}

export function editProfileRequest(user) {
  return {
    type: userConstants.PROFILE_CHANGE_REQUEST,
    payload: user
  };
}

export function editProfileSuccess(token) {
  return {
    type: userConstants.PROFILE_CHANGE_SUCCESS,
    payload: token
  };
}

export function editProfileFailure(error) {
  return {
    type: userConstants.PROFILE_CHANGE_FAILURE,
    payload: error
  };
}

function changePassword(email, password) {
  return function(dispatch) {
    let user = {
      email: email,
      password: password
    };
    dispatch(changePasswordRequest(user));
    return profileService.changePassword(email, password).then(
      user => {
        dispatch(changePasswordSuccess(user));
      },
      error => {
        dispatch(changePasswordFailure(error));
      }
    );
  };
}

export function changePasswordRequest(user) {
  return {
    type: userConstants.PROFILE_PASSWORD_CHANGE_REQUEST,
    payload: {
      user
    }
  };
}

export function changePasswordSuccess(user) {
  return {
    type: userConstants.PROFILE_PASSWORD_CHANGE_SUCCESS,
    payload: user
  };
}

export function changePasswordFailure(error) {
  return {
    type: userConstants.PROFILE_PASSWORD_CHANGE_FAILURE,
    payload: error,
    error
  };
}
