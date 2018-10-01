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

function dataAboutUser() {
  return axios
    .get("https://localhost:5001/account/user", {
      // let tmp = axios.get('http://httpbin.org/post', {
      headers: {
        Authorization: authHeader()
      }
    })
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
      "https://localhost:5001/account/changePassword",
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
        debugger;

        return response;
      },
      error => {
        debugger;
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function editProfile(email, username, firstName, surName, gender) {
  return axios
    .put(
      "https://localhost:5001/account/editProfile",
      {
        Username: username,
        Email: email,
        Password: password,
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
        debugger;
        return response;
      },
      error => {
        debugger;
        return Promise.reject(processErrorResponse(error));
      }
    );
}
