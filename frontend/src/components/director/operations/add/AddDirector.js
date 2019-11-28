import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../../utils/Constants";
import {checkAccessToken} from "../../../../utils/APIUtils";
import {WarningPage} from "../../../../commons/warning/WarningPage";
import {getPlaces} from "../../../../utils/PlaceUtils";
import {getDirectorProfile} from "../../../../utils/DirectorUtils";

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
            isAuthorized: false,
        }
    }

    componentDidMount() {
        this.loadPlaces();
        if (this.props.id) {
            this.loadDirector(this.props.id);
        }
        this.setState({isAuthorized: this.props.currentUser.role === "Admin"})
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        this.checkRole();
        // TODO contains
        return (
            <div>
            {/*    TODO */}
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
        } else if (!this.state.isAuthorized) {
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
        this.setState({isLoading: true});
        getPlaces().then(response => {
            this.setState({
                places: response,
                isLoading: false
            })
        }).catch(error => this.catchError(error.status))
    };

    catchError = (status) => {
        if (status === 404) {
            this.setState({
                isNotFound: true,
                isLoading: false
            })
        } else if (status === 400) {
            this.setState({
                isBadRequest: true,
                isLoading: false
            })
        } else {
            this.setState({
                isServerError: true,
                isLoading: false
            })
        }
    };

    loadDirector = (id) => {
        this.setState({isLoading: true});

        getDirectorProfile(id).then(response => {
            this.setState({
                director: response,
                isLoading: false
            });
        }).catch(error => this.catchError(error.status))
    };
}