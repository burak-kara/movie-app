import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../../utils/Constants";
import {getAllMovies} from "../../../../utils/MovieUtils";
import {checkAccessToken} from "../../../../utils/APIUtils";

export default class ListMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            isLoading: false,
            isBadRequest: false,
            isNotFound: false,
            isServerError: false,
        }
    }

    componentDidMount() {
        this.loadMovies();
    }

    render() {
        checkAccessToken(ACCESS_TOKEN);
        // TODO contains
        return (
            <div>
                {/*    TODO */}
            </div>
        );
    }

    loadMovies = () => {
        this.setState({isLoading: true});

        getAllMovies().then(response => {
            this.setState({
                movies: response,
                isLoading: false
            });
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
}