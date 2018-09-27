import axios from "axios";
// import cheerio from "cheerio";
import { parseJSON, processErrorResponse } from "../utils/misc";

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
        return Promise.reject(processErrorResponse(error));
      }
    );
}
