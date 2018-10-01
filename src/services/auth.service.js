import config from "config";
import { authHeader } from "../helpers";

import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";

import jwtDecode from "jwt-decode";

export const authService = {
  login,
  register,
  logout,
};

function login(email, password) {
  return axios
    .post("https://localhost:5001/account/token", {
      Email: email,
      Password: password
    })
    .then(parseJSON)
    .then(
      response => {
        if (response.token) {
          let tpm = jwtDecode(response.token);
          let user = {
            username: tpm.unique_name,
            email: tpm.email,
            token: response.token
          };
          localStorage.setItem("user", JSON.stringify(user));

          // axios.defaults.headers.common['Authorization'] =
          //     'Bearer ' + response.token;
          return user;
        }
        return error;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function register(email, username, password, firstName, surName) {
  return axios
    .post("https://localhost:5001/account/register", {
      Username: username,
      Email: email,
      Password: password,
      FirstName: firstName,
      Surname: surName
    })
    .then(parseJSON)
    .then(
      response => {
        debugger;
        if (response.token) {
          // let tpm = jwtDecode(response.token);
          let user = {
            username: response.username,
            email: response.email,
            token: response.token
          };
          localStorage.setItem("user", JSON.stringify(user));

          // axios.defaults.headers.common['Authorization'] =
          //     'Bearer ' + response.token;
          return user;
        }
        return error;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function logout() {
  localStorage.removeItem("user");
}
