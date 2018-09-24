import { authHeader } from "../helpers";
import axios from "axios";
import { parseJSON } from "../utils/misc";

export const pinService = {
  addPin,
  deletePin,
  getPins
};

function addPin(name, description, img, Link, BoardId) {
  return axios
    .post(
      "https://localhost:5001/pin/addPin",
      {
        Name: name,
        Description: description,
        Img: img,
        Link: Link,
        BoardId: BoardId,
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

function getPins() {
  // axios.defaults.headers.common["Authorization"] = authHeader();
  return axios
    .post(
      "https://localhost:5001/pin/getPins",
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

function deletePin(Id) {
  return axios
    .post(
      "https://localhost:5001/pin/deletePin",
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
