import {DELETE, GET, POST, MOVIE_URL, PUT} from "./Constants";
import {request} from "./APIUtils";

export function getMovieProfile(movieId) {
    return request({
        url: MOVIE_URL + "/" + movieId,
        method: GET
    });
}

export function getAllMovies() {
    return request({
        url: MOVIE_URL,
        method: GET
    });
}

export function addImdbMovie(movieParams) {
    return request({
        url: MOVIE_URL + "/imdb",
        method: POST,
        body: JSON.stringify(movieParams)
    });
}

export function addMovie(addParams) {
    return request({
        url: MOVIE_URL,
        method: POST,
        body: JSON.stringify(addParams)
    });
}

export function updateMovie(updateParams, movieId) {
    return request({
        url: MOVIE_URL + "/" + movieId,
        method: PUT,
        body: JSON.stringify(updateParams)
    });
}

export function deleteMovie(movieId) {
    return request({
        url: MOVIE_URL + "/" + movieId,
        method: DELETE
    });
}