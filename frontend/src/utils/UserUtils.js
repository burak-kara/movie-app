import {DELETE, GET, POST, USER_URL, PUT} from "./Constants";
import {request} from "./APIUtils";

export function login(loginParams) {
    return request({
        url: USER_URL + "/login",
        method: POST,
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginParams)
    });
}

export function getUser(userId) {
    return request({
        url: USER_URL + "/" + userId,
        method: GET
    });
}

export function getAllUsers() {
    return request({
        url: USER_URL,
        method: GET
    });
}

export function addUser(addParams) {
    return request({
        url: USER_URL,
        method: POST,
        body: JSON.stringify(addParams)
    });
}

export function updateUser(id, updateParams) {
    return request({
        url: USER_URL + "/" + id,
        method: PUT,
        body: JSON.stringify(updateParams)
    });
}

export function deleteUser(userId) {
    return request({
        url: USER_URL + "/" + userId,
        method: DELETE
    });
}

export function getAllUserLists(userId) {
    return request({
        url: USER_URL + "/" + userId + "/lists",
        method: GET
    });
}

export function getMoviesFromUserList(userId, listId) {
    return request({
        url: USER_URL + "/" + userId + "/lists/" + listId,
        method: GET
    });
}

// TODO how to add movie to the list
export function addMovieToList(userId, listId, movieId) {
    return request({
        url: USER_URL + "/" + userId + "/lists/" + listId,
        method: POST,
        body: JSON.stringify(movieId) // TODO possible mistake
    });
}

// TODO how to delete movie from the list
export function deleteMovieFromList(userId, listId, movieId) {
    return request({
        url: USER_URL + "/" + userId + "/lists/" + listId + "/movies/" + movieId,
        method: DELETE
    });
}