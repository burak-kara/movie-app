export function request(options) {
    // TODO add Authorization token to headers
    return fetch(options.url, options)
        .then(response => response.json()
            .then(json => {
                if (!response.ok) {
                    console.log("response is not ok " + response);
                    return Promise.reject(json);
                }
                return json;
            })
        );
}