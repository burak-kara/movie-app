import React, {Component} from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {ACCESS_TOKEN} from "../../utils/Constants";
import LoadingIndicator from "../loading/LoadingIndicator";
import {checkAccessToken} from "../../utils/APIUtils";
import "./Home.css"


export default class Home extends Component {
    render() {
        checkAccessToken(ACCESS_TOKEN);

        return (
            <div  className="home-image">
                    <div className="home-text">
                        <h1 className="row justify-content-md-center">Welcome to Movie App</h1>
                        <p className="row justify-content-md-center">
                                Developed for the CS 434 OOP course in Özyeğin University</p>
                    </div>
            </div>
        );
    }
}