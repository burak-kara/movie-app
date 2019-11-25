import {WarningPage} from "../commons/warning/WarningPage";
import React from "react";

export function request(options) {
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
}

export function checkAccessToken(accessToken) {
    if (!localStorage.getItem(accessToken)) {
        return (
            <WarningPage
                title={"Welcome"}
                info={"Please Login"}
                buttonText={"Login"}
                link={"/"}
            />
        )
    }
}