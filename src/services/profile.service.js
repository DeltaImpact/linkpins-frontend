import config from "config";
import { authHeader } from "../helpers";

import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";

import jwtDecode from "jwt-decode";

export const profileService = {
  dataAboutUser,
  changePassword,
  editProfile
};

function dataAboutUser(nickname) {
  let requestUrl = `${config.apiUrl}/account/user?userNickname=${nickname}`;
  if (nickname== undefined){
    requestUrl = `${config.apiUrl}/account/user`;
  }

  return axios
    .get(
      requestUrl,
      {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      user => {
        return user;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function changePassword(oldPassword, newPassword) {
  return axios
    .put(
      `${config.apiUrl}/account/changePassword`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword
      },
      {
        headers: {
          Authorization: authHeader()
        }
      }
    )
    .then(parseJSON)
    .then(
      response => {
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function editProfile(email, username, firstName, surName, gender) {
  return axios
    .put(
      `${config.apiUrl}/account/editProfile`,
      {
        Username: username,
        Email: email,
        FirstName: firstName,
        Surname: surName,
        Gender: gender
      },
      {
        // let tmp = axios.get('http://httpbin.org/post', {
        headers: {
          Authorization: authHeader()
        }
      }
    )
    .then(parseJSON)
    .then(
      response => {
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}
