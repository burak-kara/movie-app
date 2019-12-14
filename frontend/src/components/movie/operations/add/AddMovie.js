import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../../utils/Constants";
import {checkAccessToken} from "../../../../utils/APIUtils";
import {WarningPage} from "../../../../commons/warning/WarningPage";
import {getPlaces} from "../../../../utils/PlaceUtils";
import {getMovieProfile} from "../../../../utils/MovieUtils";

export default class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
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
            this.loadMovie(this.props.id);
        }
        this.setState({isAuthorized: this.props.currentUser.role === "Admin"})
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        this.checkRole();
        // TODO contains
        return (
            <div>
                Add Movie
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

    loadMovie = (id) => {
        this.setState({isLoading: true});

        getMovieProfile(id).then(response => {
            this.setState({
                movie: response,
                isLoading: false
            });
        }).catch(error => this.catchError(error.status))
    };
}