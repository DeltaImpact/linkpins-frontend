import config from "config";
import { authHeader } from "../helpers";

import axios from "axios";
import { parseJSON } from "../utils/misc";

export const boardService = {
  addBoard,
  deleteBoard,
  getBoards
};

function addBoard(name, description, img, isPrivate) {
  return axios
    .post("https://localhost:5001/board/addBoard", {
      headers: {
        Authorization: authHeader()
      },
      Name: name,
      Email: description,
      Img: img,
      IsPrivate: isPrivate
    })
    .then(parseJSON)
    .then(
      response => {
        debugger;
        return response;
      },
      error => {
        let err = {};
        if (error.response) {
          err.response = error.response;
          if (error.response.status === 400) {
            err.status = error.response.status;
            err.errorMessage = error.response.statusText;
            err.info = error.response.data.message;
          }

          if (error.response.data.message) {
            err.errorMessage = error.response.data.message;
          }
        }

        if (error.message === "Network Error") {
          err.status = 503;
          err.errorMessage = "Network Error";
        }

        debugger;
        return Promise.reject(err);
      }
    );
}

function getBoards() {
  // debugger
  // axios.defaults.headers.common["Authorization"] = authHeader();
  return (
    axios
      .post("https://localhost:5001/board/getBoards", {},  {
      // .post("http://httpbin.org/post", {},  {
        headers: {  Authorization: authHeader() }
      })
      .then(parseJSON)
      .then(
        user => {
          // debugger;
          // console.log(user)
          return user;
        },
        error => {
          let err = {};
          if (error.response) {
            err.response = error.response;
            if (error.response.status === 400) {
              err.status = error.response.status;
              err.message = error.response.statusText;
              err.info = error.response.data.message;
            }

            if (error.response.data.message) {
              err.message = error.response.data.message;
            }
          }

          if (error.message === "Network Error") {
            err.status = 503;
            err.message = "Network Error";
          }

          // debugger;
          return Promise.reject(err);
        }
      )
  );
}

function deleteBoard(name) {
  return axios
    .post("https://localhost:5001/board/deleteBoard", {
      headers: {
        Authorization: authHeader()
      },
      Name: name
    })
    .then(parseJSON)
    .then(
      response => {
        debugger;
        return response;
      },
      error => {
        let err = {};
        if (error.response) {
          err.response = error.response;
          if (error.response.status === 400) {
            err.status = error.response.status;
            err.errorMessage = error.response.statusText;
            err.info = error.response.data.message;
          }

          if (error.response.data.message) {
            err.errorMessage = error.response.data.message;
          }
        }

        if (error.message === "Network Error") {
          err.status = 503;
          err.errorMessage = "Network Error";
        }

        // debugger
        return Promise.reject(err);
      }
    );
}
