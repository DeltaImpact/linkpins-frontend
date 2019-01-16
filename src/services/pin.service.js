import { authHeader } from "../helpers";
import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";
import config from "config";
import { history } from "../helpers";

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
  getMainPage
};

function updatePin(id, name, description) {
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
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function addPin(name, description, img, Link, BoardId) {
  // debugger
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
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getPins() {
  return axios
    .post(
      `${config.apiUrl}/pin/getPins`,
      {},
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

function deletePin(id) {
  axios.defaults.headers.common["Authorization"] = authHeader();
  return axios
    .delete(`${config.apiUrl}/pin/deletePin`, { params: { pinId: id } })
    .then(parseJSON)
    .then(
      response => {
        window.location.reload();
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getBoardsWherePinSaved(id) {
  return axios
    .get(`${config.apiUrl}/pin/getBoardsWherePinSaved?pinId=${id}`, {
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

function getBoardsWherePinNotSaved(id) {
  return axios
    .get(`${config.apiUrl}/pin/getBoardsWherePinNotSaved?pinId=${id}`, {
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
  return (
    axios({
      url: `${config.apiUrl}/pin/deletePinFromBoard`,
      method: "delete",
      data: { PinId: pinId, BoardId: boardId },
      headers: { Authorization: authHeader() }
    })
      .then(parseJSON)
      .then(
        user => {
          if (user.isLast) history.push("/");
          return user;
        },
        error => {
          return Promise.reject(processErrorResponse(error));
        }
      )
  );
}

function getMainPage() {
  return axios
    .get(
      `${config.apiUrl}/pin/getMainPage`,
      {},
      {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      object => {
        return object;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}
