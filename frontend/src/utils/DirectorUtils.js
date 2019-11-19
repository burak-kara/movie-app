import {GET, DIRECTOR_URL} from "./Constants";
import {request} from "./APIUtils";

export function getDirectorProfile(directorId) {
    return request({
        url: DIRECTOR_URL + "/" + directorId,
        method: GET
    });
}