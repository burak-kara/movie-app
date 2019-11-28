import {request} from "./APIUtils";
import {DELETE, GET, PLACE_URL, POST, PUT} from "./Constants";

export function getPlaces() {
    return request({
        url: PLACE_URL,
        method: GET
    });
}

export function getPlaceProfile(id) {
    return request({
        url: PLACE_URL + "/" + id,
        method: GET
    });
}

export function addPlace(addParams) {
    return request({
        url: PLACE_URL,
        method: POST,
        body: JSON.stringify(addParams)
    })
}

export function updatePlace(id, updateParams) {
    return request({
        url: PLACE_URL + "/" + id,
        method: PUT,
        body: JSON.stringify(updateParams)
    });
}

export function deletePlace(id) {
    return request({
        url: PLACE_URL + "/" + id,
        method: DELETE
    });
}