import config from "config";
import { authHeader } from "../helpers";
import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";

export const boardService = {
  addBoard,
  deleteBoard,
  updateBoard,
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
        return Promise.reject(processErrorResponse(error));
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
        return Promise.reject(processErrorResponse(error));
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
        return Promise.reject(processErrorResponse(error));
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
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function updateBoard(id, name, description, isPrivate) {
  // debugger
  return axios
    .post(
      "https://localhost:5001/board/updateBoard",
      {
        Id: id,
        Name: name,
        Description: description,
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
        // debugger;
        return Promise.reject(processErrorResponse(error));
      }
    );
}