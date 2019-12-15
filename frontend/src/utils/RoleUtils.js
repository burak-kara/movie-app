import {request} from "./APIUtils";
import {DELETE, GET, ROLE_URL, POST, PUT} from "./Constants";

export function getRoleProfile(id) {
    return request({
        url: ROLE_URL + "/" + id,
        method: GET
    });
}

export function getRoles() {
    return request({
        url: ROLE_URL,
        method: GET
    });
}

export function addRole(formRequest) {
    return request({
        url: ROLE_URL,
        method: POST,
        body: JSON.stringify(formRequest)
    });
}

export function updateRole(formRequest, id) {
    return request({
        url: ROLE_URL + "/" + id,
        method: PUT,
        body: JSON.stringify(formRequest)
    });
}

export function deleteRole(id) {
    return request({
        url: ROLE_URL + "/" + id,
        method: DELETE
    });
}