import {URL} from './Constants';

const request = (options) => {
    let headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    // TODO add Authorization token to headers

    headers = {headers: headers};
    Object.assign(options, headers);

    return fetch(options.url, options)
        .then(response => response.json()
            .then(json => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getDirectorProfile(directorId) {
    return request({
        url: URL + "/directors/" + directorId,
        method: 'GET'
    });
}