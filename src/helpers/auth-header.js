export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return 'Bearer ' + user.token;
    } else {
        return {};
    }
}

export function authToken() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return user.token;
    } else {
        return undefined;
    }
}

export function userNickname() {
    let user = JSON.parse(localStorage.getItem('user'));
    // debugger
    if (user && user.username) {
        return user.username;
    } else {
        return undefined;
    }
}