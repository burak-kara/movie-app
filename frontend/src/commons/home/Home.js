import React, {Component} from "react";
import Login from "../login/Login";

export default class Home extends Component {
    render() {
        // TODO implement access token
        if (!localStorage.getItem("")) {
            return <Login/>
        }
        return (
            <div>
            {/*    TODO implement Link*/}
            </div>
        );
    }
}