import axios from "axios";
// import cheerio from "cheerio";
import { parseJSON } from '../utils/misc';

export const dataService = {
  parse
};

function parse(url) {
    
  return axios
    .post("https://localhost:5001/parse", {
      url: url
    })
    .then(parseJSON)
    .then(
      response => {
        return response;
      },
      error => {
        let err = {};
        // response: {
        //     status: 503,
        //     statusText: 'User with that email already exists',
        // },
        // let errorMessage = "";
        if (error.response) {
          err.response = error.response;
          if (error.response.status === 400) {
            logout();
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
