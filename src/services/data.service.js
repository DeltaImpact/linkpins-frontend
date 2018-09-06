export const dataService = {
    parse,
};

function parse(url) {
    return axios.get('http://httpbin.org/get', {
        url: url,
    })
        .then(parseJSON)
        .then(response => {
            debugger
            if (response.token) {
                let tpm = jwtDecode(response.token);
                let user = {
                    username: tpm.unique_name,
                    email: tpm.email,
                    token: response.token
                }
                localStorage.setItem('user', JSON.stringify(user));
                debugger
                // axios.defaults.headers.common['Authorization'] =
                //     'Bearer ' + response.token;
                return user;
            }
            return error;
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


                // debugger
                return Promise.reject(err);
            }



        );
}