import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../../../utils/Constants";
import {getAllDirectors} from "../../../../utils/DirectorUtils";
import {checkAccessToken} from "../../../../utils/APIUtils";

export default class ListDirectors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directors: null,
            isLoading: false,
            isBadRequest: false,
            isNotFound: false,
            isServerError: false,
        }
    }

    componentDidMount() {
        this.loadDirectors();
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

    loadDirectors = () => {
        this.setState({isLoading: true});

        getAllDirectors().then(response => {
            this.setState({
                directors: response,
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