import config from "config";
import { authHeader } from "../helpers";

import axios from "axios";
import { parseJSON } from "../utils/misc";

export const boardService = {
  addBoard,
  deleteBoard,
  getBoards,
  getBoard,
};

function addBoard(name, description, img, isPrivate) {
  return axios
    .post(
      "https://localhost:5001/board/addBoard",
      {
        Name: name,
        Description: description,
        Img: img,
        IsPrivate: isPrivate
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
        // debugger;
        return response;
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

        // debugger
        return Promise.reject(err);
      }
    );
}

function getBoards() {
  // axios.defaults.headers.common["Authorization"] = authHeader();
  return axios
    .post(
      "https://localhost:5001/board/getBoards",
      {},
      {
        // .post("http://httpbin.org/post", {},  {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      user => {
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

        return Promise.reject(err);
      }
    );
}

function getBoard(id) {
  let url = 'https://localhost:5001/board/' + id;
  // let as = "{0}{1}".format("{1}", "{0}");
  // debugger
  return axios
    .get(
      url,
      // {},
      {
        // .post("http://httpbin.org/post", {},  {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      user => {
        // console.log(user)
        // debugger
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
        // debugger

        return Promise.reject(err);
      }
    );
}

function deleteBoard(Id) {
  return axios
    .post(
      "https://localhost:5001/board/deleteBoard",
      { Id: Id },
      {
        headers: {
          Authorization: authHeader()
        }
      }
    )
    .then(parseJSON)
    .then(
      response => {
        // debugger;
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

        return Promise.reject(err);
      }
    );
}
