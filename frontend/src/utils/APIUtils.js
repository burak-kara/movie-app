import {WarningPage} from "../commons/warning/WarningPage";
import React from "react";
import LoadingIndicator from "../commons/loading/LoadingIndicator";

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


export function checkStates(states) {
    if (states.isLoading) {
        return <LoadingIndicator/>
    }

    if (states.isBadRequest) {
        return (
            <WarningPage
                title={"400"}
                info={"Bad Request"}
                buttonText={"Go Back"}
                link={"/"}
            />
        )
    } else if (states.isNotFound) {
        return (
            <WarningPage
                title={"404"}
                info={"The page you are looking for was not found"}
                buttonText={"Home"}
                link={"/"}
            />
        )
    } else if (states.isServerError) {
        return (
            <WarningPage
                title={"500"}
                info={"Oops! Something went wrong"}
                buttonText={"Go Back"}
                link={"/"}
            />
        )
    }
}