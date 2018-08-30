import config from 'config';
import { authHeader } from '../helpers';

import axios from 'axios';
import { parseJSON } from '../utils/misc';

import jwtDecode from 'jwt-decode';

export const userService = {
    login,
    register,
    logout,
    data_about_user,
};

const tokenConfig = (token) => ({
    headers: {
        'token': token, // eslint-disable-line quote-props
    },
});


function login(email, password) {
    return axios.post('https://localhost:5001/account/token', {
        Email: email,
        Password: password,
    })
        .then(parseJSON)
        .then(response => {
            if (response.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let tpm = jwtDecode(response.token);
                let user = {
                    username: tpm.unique_name,
                    email: tpm.email,
                    token: response.token
                }
                localStorage.setItem('user', JSON.stringify(user));

                // axios.defaults.headers.common['Authorization'] =
                //     'Bearer ' + response.token;
                return user;
            }
            return error;
        },
            error => {
                let errorMessage = "";
                if (error.message === "Network Error") {
                    errorMessage = "Network Error";
                }
                errorMessage = error.response.statusText;
                return Promise.reject(errorMessage);
            }



        );
}

function register(email, username, password) {
    return axios.post('https://localhost:5001/account/register', {
        Username: username,
        Email: email,
        Password: password
    })
        .then(parseJSON)
        .then(response => {
            debugger
            if (response.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let tpm = jwtDecode(response.token);
                let user = {
                    username: tpm.unique_name,
                    email: tpm.email,
                    token: response.token
                }
                localStorage.setItem('user', JSON.stringify(user));

                // axios.defaults.headers.common['Authorization'] =
                //     'Bearer ' + response.token;
                return user;
            }
            return error;
        },
            error => {
                let errorMessage = "";
                if (error.message === "Network Error") {
                    errorMessage = "Network Error";
                }
                errorMessage = error.response.statusText;
                return Promise.reject(errorMessage);
            }



        );
}

function logout() {
    localStorage.removeItem('user');
}

function data_about_user() {

    return axios.get('https://localhost:5001/account/user', {
        // let tmp = axios.get('http://httpbin.org/get', {
        headers: {
            Authorization: authHeader()
        }
    })
        .then(parseJSON)
        .then(user => {
            // console.log(user)
            return user;

        },
            error => {
                let errorMessage = "";
                if (error.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                    errorMessage = error.response.statusText;
                }

                if (error.message === "Network Error") {
                    // auto logout if 401 response returned from api
                    errorMessage = "Network Error";
                }

                return Promise.reject(errorMessage);
            }
        );
}