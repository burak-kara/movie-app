import {request} from "./APIUtils";
import {DELETE, GET, MOVIE_LIST_URL, POST, PUT} from "./Constants";

export function getLists() {
    return request({
        url: MOVIE_LIST_URL,
        method: GET
    });
}

export function addMovieList(formRequest) {
    return request({
        url: MOVIE_LIST_URL,
        method: POST,
        body: JSON.stringify(formRequest)
    });
}

export function updateMovieList(formRequest, id) {
    return request({
        url: MOVIE_LIST_URL + "/" + id,
        method: PUT,
        body: JSON.stringify(formRequest)
    });
}

export function getListFromId(id) {
    return request({
        url: MOVIE_LIST_URL + "/" + id,
        method: GET
    });
}

export function deleteMovieList(id) {
    return request({
        url: MOVIE_LIST_URL + "/" + id,
        method: DELETE
    });
}