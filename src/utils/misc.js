/* eslint max-len: 0, no-param-reassign: 0 */

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
  };
}

export function parseJSON(response) {
  return response.data;
}

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function processErrorResponse(error) {
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

    if (error.response.data.Description) {
      err.Description = error.response.data.Description;
    }
  }

  if (error.message === "Network Error") {
    err.status = 503;
    err.message = "Network Error";
  }
  return err;
}
// export function validateEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
// }
