import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../../utils/Constants";
import {checkAccessToken} from "../../../../utils/APIUtils";
import {WarningPage} from "../../../../commons/warning/WarningPage";

export default class AddDirector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            director: null,
            places: null,
            isLoading: false,
            isBadRequest: false,
            isNotFound: false,
            isServerError: false,
        }
    }

    componentDidMount() {

    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        this.checkRole();

        return (
            <div>

            </div>
        );
    }

    checkRole = () => {
        if (!this.props.currentUser) {
            return (
                <WarningPage
                    title={"404"}
                    info={"The page you are looking for was not found"}
                    buttonText={"Home"}
                    link={"/"}
                />
            );
        } else if (this.props.currentUser.role !== "Admin") {
            return (
                <WarningPage
                    title={"401"}
                    info={"UnAuthorized Please Login as Admin"}
                    buttonText={"Home"}
                    link={"/"}
                />
            );
        }
    };

    loadPlaces = () => {
        //    TODO getPlaces
    };
}