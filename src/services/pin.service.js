import { authHeader } from "../helpers";
import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";
import config from "config";

export const pinService = {
  addPin,
  deletePin,
  getPins,
  getPin,
  updatePin,
  getBoardsWherePinSaved,
  getBoardsWherePinNotSaved,
  addPinToBoard,
  deletePinFromBoard,
};

function updatePin(id, name, description) {
  // debugger
  return axios
    .post(
      `${config.apiUrl}/pin/updatePin`,
      {
        Id: id,
        Name: name,
        Description: description
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

function addPin(name, description, img, Link, BoardId) {
  return axios
    .post(
      `${config.apiUrl}/pin/addPin`,
      {
        Name: name,
        Description: description,
        Img: img,
        Link: Link,
        BoardId: BoardId
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

function getPins() {
  // axios.defaults.headers.common["Authorization"] = authHeader();
  return axios
    .post(
      `${config.apiUrl}/pin/getPins`,
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

function getPin(id) {
  return axios
    .get(`${config.apiUrl}/pin/${id}`, {
      headers: { Authorization: authHeader() }
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

function deletePin(Id) {
  return axios
    .post(
      `${config.apiUrl}/pin/deletePin`,
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
        debugger;

        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getBoardsWherePinSaved(id) {
  return axios
    .get(
      `${config.apiUrl}/pin/getBoardsWherePinSaved?pinId=${id}`,
      { pinId: id },
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

function getBoardsWherePinNotSaved(id) {
  return axios
    .get(
      `${config.apiUrl}/pin/getBoardsWherePinNotSaved?pinId=${id}`,
      // { pinId: id },
      {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      user => {
        debugger;
        return user;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function addPinToBoard(pinId, boardId) {
  return axios
    .post(
      `${config.apiUrl}/pin/addPinToBoard`,
      { PinId: pinId, BoardId: boardId },
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

function deletePinFromBoard(pinId, boardId) {
  return axios
    .delete(
      `${config.apiUrl}/pin/deletePinFromBoard`,
      { PinId: pinId, BoardId: boardId },
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
