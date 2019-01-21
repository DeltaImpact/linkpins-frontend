import { authHeader } from "../helpers";
import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";
import config from "config";
import { history } from "../helpers";

export const chatService = {
  getDialogs,
  getDialog,
  sendMessage,
  StartTypingTo,
  StopTypingTo
};

function getDialogs() {
  return axios
    .post(
      `${config.apiUrl}/chat/getDialog`,
      {},
      {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      dialogs => {
        return dialogs;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getDialog(interlocutorId) {
  return axios
    .get(`${config.apiUrl}/chat/getDialog?interlocutorId=${interlocutorId}`, {
      headers: { Authorization: authHeader() }
    })
    .then(parseJSON)
    .then(
      dialog => {
        return dialog;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function sendMessage(Message, SentTo) {
  return axios
    .post(
      `${config.apiUrl}/chat/SendMessage`,
      {
        Message: Message,
        SentTo: SentTo
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

function StartTypingTo(interlocutorId) {
  return axios
    .get(`${config.apiUrl}/chat/startTyping?interlocutorId=${interlocutorId}`, {
      headers: { Authorization: authHeader() }
    })
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

function StopTypingTo(interlocutorId) {
  return axios
    .get(`${config.apiUrl}/chat/stopTyping?interlocutorId=${interlocutorId}`, {
      headers: { Authorization: authHeader() }
    })
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
