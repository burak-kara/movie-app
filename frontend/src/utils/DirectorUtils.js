import {DELETE, GET, POST, DIRECTOR_URL, PUT} from "./Constants";
import {request} from "./APIUtils";

export function getDirectorProfile(directorId) {
    return request({
        url: DIRECTOR_URL + "/" + directorId,
        method: GET
    });
}

export function getDirectorMovies(directorId) {
    return request({
        url: DIRECTOR_URL + "/" + directorId + "/movies",
        method: GET
    });
}

export function getAllDirectors() {
    return request({
        url: DIRECTOR_URL,
        method: GET
    });
}

export function addDirector(addParams) {
    return request({
        url: DIRECTOR_URL,
        method: POST,
        body: JSON.stringify(addParams)
    });
}

export function updateDirector(updateParams, directorId) {
    return request({
        url: DIRECTOR_URL + "/" + directorId,
        method: PUT,
        body: JSON.stringify(updateParams)
    });
}

export function deleteDirector(directorId) {
    return request({
        url: DIRECTOR_URL + "/" + directorId,
        method: DELETE
    });
}